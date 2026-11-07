---
title: Shopify application only tokens
slug: shopify-application-only-access-tokens
date: 2026-11-01T18:00:00.000Z
updated: 2026-11-07T19:47:00.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1584985429926-08867327d3a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Everyday basics
  profile_url: https://unsplash.com/@zanardi?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/photos/black-and-silver-skeleton-key-GJY1eAw6tn8?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Expiring offline tokens locked some merchants out when the old token died before the new one
  landed. Application-only access is the recovery path Shopify should have shipped with the migration.
---

<!-- Never use the — character (em dash). Prefer commas, colons, or a normal hyphen (-). -->

Earlier this year Shopify told every app to move onto expiring offline access tokens. The shape of that grant is familiar if you have shipped OAuth before: a short-lived access token (about an hour) and a longer-lived refresh token (about ninety days). Your server renews the access token in the background. The merchant is not meant to notice.

Some of mine did.

## What actually broke

The migration was supposed to exchange the old non-expiring offline token for the new pair, then carry on. For most shops that is what happened. For some merchants, on some of my apps, it did not.

I still do not know the precise failure. What I could see afterwards was the result: Shopify had expired or revoked the legacy token before a usable replacement was stored. If the token request failed on Shopify's side, or the app failed to persist the new pair, that shop was stuck. No working access token, no refresh token, and the documented window for exchanging the old token had already closed. Asking the merchant to open the app again was not a reliable fix either. For a chunk of installations, the only credential we had was already dead.

Background jobs, webhooks that needed the Admin API, anything that called `$shop->api()`: gone, for those shops, until someone could mint a new token without a refresh grant. There was not one.

I spent months on the [Shopify developer community](https://community.shopify.dev/t/please-add-recovery-parity-with-refresh-tokens/37538/26). I replied on existing threads and opened my own, asking for the same thing in different words: if a refresh token never lands, how does an already-installed app get back in without hoping the merchant re-authenticates? The answers did not arrive.

## What they shipped instead

Several months on, Shopify added [application-only access tokens](https://shopify.dev/docs/apps/build/authentication-authorization/application-only-access-tokens). Their description is the part that matters:

> We have added support for a new mode of token acquisition, application only access. This mode of token acquisition allows apps to acquire expiring access tokens without merchant interaction after the app is installed in a shop. The access tokens acquired using this grant type will expire after one hour just like the tokens acquired with other grant types.

That is the missing recovery path. The app is already installed. The scopes are already granted. You should not need a merchant session, or a refresh token you never received, to talk to that shop again.

### How the grant works

You do not send the client secret. You register a public key (as a JWK, with a `kid`) in the Dev Dashboard, and you keep the matching private key on your server. For each token request you sign a short-lived JWT, a client assertion, and POST it to that shop's token endpoint:

- `grant_type=client_credentials`
- `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer`
- a freshly signed `client_assertion`

Shopify checks the assertion against the public key. `iss` and `sub` are your app's client ID. `aud` is `https://{shop}.myshopify.com/admin/oauth/access_token`, using the shop's permanent domain. `exp` is at most five minutes after `iat` (their example uses sixty seconds). `jti` is single-use for your app, across every shop, including retries. Sign a new assertion every time.

The response is an access token, the scopes that installation already has (not a menu you pass in; a `scope` parameter is ignored), and `expires_in`. For a public app that is about an hour. There is no refresh token. Renewal is another client-assertion request. Getting a new token does not revoke the current one, so a failed renewal can still use whatever time is left on the old token.

A public app can do this for any shop that has installed it. Custom apps stay on the older client-credentials rules: organisation stores only, and a longer token lifetime (twenty-four hours in the current docs).

This is not a replacement for the normal expiring-offline flow when that flow worked. If you have a real refresh token, keep using it. Application-only access is how you acquire an hour of Admin API access when you cannot.

## One broken shop, tested

I have only tested this on one shop that had been stuck since the migration. Same app, same installation, no merchant in the loop. The client assertion came back with a token, and Admin API calls started succeeding again.

Once the pull request is merged into kyon147/laravel-shopify, I will run it across the rest of the affected stores. Hopefully that gets me back to 100% of the shop access I lost.

I am glad the door is open. I am less glad about how long it took to get a solution out of Shopify. Months of forum posts for a failure mode that was obvious the moment expiring tokens became mandatory: the exchange is not atomic from the app's point of view, and there was no second grant if the first one never stuck.

## kyon147/laravel-shopify

I co-maintain [kyon147/laravel-shopify](https://github.com/Kyon147/laravel-shopify), which is what my apps run on. I have opened a pull request to support this grant for shops that have no usable refresh token: [Add application-only offline access for shops without a refresh token](https://github.com/Kyon147/laravel-shopify/pull/524).

The normal refresh path stays as it is. Shops that already have a Shopify refresh token keep renewing through that grant, including the scheduled command that refreshes inactive shops before the refresh token itself dies.

Application-only shops are the other set: empty or invalid refresh columns, legacy token already useless. The package signs the client assertion (RSA or ES256, via `firebase/php-jwt`), stores the access token through the existing shop token flow, and puts a sentinel in the refresh column so nothing pretends there is a ninety-day refresh token. The scheduled refresh command skips those rows. The next `$shop->api()` call re-acquires a token with a new assertion when the access token is near expiry, same skew as the refresh path today.

You still do a one-off sync for a shop that has never stored an application-only token (a repair endpoint, or tinker, calling `ApplicationOnlyOfflineAccessSynchronizer`). After that, ordinary API use keeps it alive. Configuration is the key id from the Dev Dashboard plus the private key, and expiring offline tokens still have to be enabled so the refresher runs at all. The public key has to stay on the app in Shopify for as long as any shop uses this path.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/Kyon147/laravel-shopify/pull/524" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Add application-only offline access for shops without a refresh token</div>
<div class="bookmark-card-description">Client-assertion tokens for installed shops that never received a usable refresh token, without changing the normal expiring-offline path.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="/images/bookmarks/laravel-shopify.png" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

If you are sitting on installations that died in that migration, this is the first official way I have had to bring them back without a merchant session. It should have shipped with the expiring-token requirement. It did not. At least it exists now.
