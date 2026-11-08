---
title: Building a Monzo SDK with Saloon
slug: building-a-monzo-sdk-with-saloon
date: 2026-11-08T18:00:00.000Z
tags:
  - development
  - saloonphp
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1639322537138-5e513100b36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000
feature_image_credit:
  name: Shubham Dhage
  profile_url: https://unsplash.com/@theshubhamdhage?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/photos/a-group-of-cubes-that-are-connected-to-each-other-R2HtYWs5-QA?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I've been building a PHP SDK for the Monzo developer API with Saloon v4. The API
  looks small until you get to OAuth, form bodies, file uploads and pagination.
---

I've been building a PHP SDK for the [Monzo developer API](https://docs.monzo.com/) with [Saloon](https://docs.saloon.dev/) v4. I wanted something I could `composer require` into any PHP app, not a Laravel package with a service provider. Saloon is already set up for this. You make a connector, a request class for each endpoint, and resources once you've got more than a handful of methods. That's pretty much what the [building SDKs](https://docs.saloon.dev/digging-deeper/building-sdks) docs tell you to do, so I followed them.

The package is [jonpurvis/monzo-php-sdk](https://github.com/JonPurvis/monzo-php-sdk). PHP 8.2, Saloon, and the pagination plugin. Monzo's API isn't huge, but bits of it behave differently enough that you can't treat every call the same.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/JonPurvis/monzo-php-sdk" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">JonPurvis/monzo-php-sdk</div>
<div class="bookmark-card-description">Framework-agnostic Monzo developer API SDK, built with Saloon v4.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/JonPurvis/monzo-php-sdk" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

## The connector

`Monzo` extends Saloon's `Connector` and the base URL is `https://api.monzo.com`. I used the `AcceptsJson` plugin so requests send `Accept: application/json`. I deliberately didn't set a default `Content-Type`, because most of this API isn't JSON. More on that in a bit.

Every endpoint in the docs has its own request class. The resources (`accounts()`, `transactions()`, `oauth()` and so on) just build one of those and send it. If you'd rather use `send()` yourself, it's the same class.

```php
$monzo = Monzo::connect(accessToken: $accessToken);

$accounts = $monzo->accounts()->list()->throw()->json('accounts');
```

The factory is `connect()` and not `make()`, because `Connector` already has a `make()` and I didn't want to clash with it.

## OAuth

This was the fiddly bit. You send the user to `https://auth.monzo.com/`, but the token call is `POST https://api.monzo.com/oauth2/token`. Saloon's `AuthorizationCodeGrant` sticks the authorise path on the end of the connector base URL, which would be wrong here. You can give it a full URL if you turn on `allowBaseUrlOverride`, so the authorise endpoint is the absolute auth host and the token and whoami paths stay relative (`/oauth2/token` and `/ping/whoami`).

The trait gives you `getAuthorizationUrl()`, `getAccessToken()` and `refreshAccessToken()`. I also kept methods on the OAuth resource, because sometimes you just want the JSON back (`access_token`, `refresh_token`, `expires_in`, `user_id`) instead of an authenticator. They both use the same request classes.

Monzo's docs say if the `state` you get back doesn't match the one you sent, stop. `exchangeAuthorizationCode()` checks that with `hash_equals()` before it even hits the token endpoint. `getAccessToken()` does the same thing if you pass the state you expected.

The token and refresh requests also use `NullAuthenticator`. The body already has `client_id` and `client_secret`, and I don't want a bearer token from a previous request going out with them. Logout is the other way round: `POST /oauth2/logout` with the bearer token, and once you've done that you can't refresh.

Only confidential clients get a refresh token. A new access token also kills the old one for that user. And in Saloon v4 you shouldn't serialise `AccessTokenAuthenticator`. Store the access token, refresh token and expiry yourself.

## Form bodies, apart from receipts

Nearly everything is `application/x-www-form-urlencoded`: accounts, balance, pots, transactions, feed items, attachments, webhooks. Receipts are the odd one out. Creating one is a `PUT` with a JSON body. That's why the connector doesn't force `Content-Type: application/json`. Each request uses `HasFormBody` or `HasJsonBody`.

A few of the form calls aren't a flat list of fields either. Annotating a transaction is `metadata[notes]=...`. Feed items are `params[title]=...`. And if you want the merchant expanded, Monzo wants `expand[]=merchant`, not `expand[0]=merchant`. `http_build_query()` gives you the `[0]` version, so those requests rewrite the query string before it gets sent.

Depositing into a pot and withdrawing from one both need a `dedupe_id`, and it has to stay the same if you retry, otherwise you can move the money twice. If you don't pass one, the request makes one in the constructor and keeps it. Doing that inside `defaultBody()` would be a bad idea, because Saloon can build the body more than once and you'd get a new id each time.

## Uploading a file

If Monzo is hosting the image, it's three requests:

1. `POST /attachment/upload` with the file name, type and content length. You get back an `upload_url` and a `file_url`.
2. `POST` the bytes to `upload_url`. That isn't `api.monzo.com`.
3. `POST /attachment/register` with the transaction id as `external_id`, plus the `file_url` and `file_type`.

The second one needs `allowBaseUrlOverride`, a string body, and `NullAuthenticator` again. The URL is already signed. If you also send `Authorization: Bearer ...`, you're posting the user's token at a storage host. `Content-Type` is the file type from step 1, and `Content-Length` is `strlen()` of the bytes, which is the `content_length` you already sent.

If you're hosting the image yourself, you just register it.

## Listing transactions

`GET /transactions` takes `account_id`, and optionally `since`, `before` and `limit`. Limit is 1 to 100. Monzo's default is 30. `before` is an RFC 3339 timestamp. `since` can be a timestamp or an object id, like `tx_...`. The list comes back oldest first, so the next page is "start after the last id".

I used Saloon's pagination plugin for that. It's a cursor paginator, but the cursor goes in `since` rather than a query param called `cursor`. If a page comes back short, or empty, that's the last one.

There's also a note in the docs about Strong Customer Authentication. After a few minutes you can only sync roughly the last 90 days. If you want the full history you need to grab it just after the user approves access. Nothing the SDK can do about that.

## When a request fails

I nearly overrode `throw()` on a custom response class. That works until you use `AlwaysThrowOnErrors`, a pool, or async, because those ask the connector for the exception via `getRequestException()`. So that's where `MonzoRequestException` gets built.

It extends Saloon's `RequestException`, so you still get `getResponse()`. It also keeps the Monzo `error` / `code` and the body. `invalid_token` is the auth one you'll actually see. There's still a `MonzoResponse` from `resolveResponseClass()`, so the resources can return that type. It doesn't have its own `throw()`.

## Tests

Each endpoint has a fixture in `tests/Fixtures/Saloon/`, using the JSON from Monzo's docs rather than something I made up. `MockClient` points the request class at the fixture. A few tests check the actual request too, where I knew I'd get it wrong: `expand[]`, the upload being a `POST`, and `dedupe_id` staying the same if you send the same request twice.

A few things get rejected before a request goes out. `account_type` can only be `uk_retail` or `uk_retail_joint`. A basic feed item needs a title and an image URL, and colours have to be `#RRGGBB`. A receipt needs `transaction_id`, `external_id`, `currency`, `items` and a positive `total`. Those are required in the docs, so I'd rather throw than wait for a 400.

The only webhook the docs describe is `transaction.created`. `TransactionCreated::fromPayload()` checks the `type` and gives you `data`. Registering and deleting the URL are normal requests.

PHPStan is on max, and CI runs Rector and PHP-CS-Fixer. No Pint. This isn't a Laravel package, so I didn't want Pint in there just to format the tests.

I'll write about actually using it another time.
