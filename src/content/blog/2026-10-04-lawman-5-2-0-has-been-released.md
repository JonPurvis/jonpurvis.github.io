---
title: Lawman 5.2.0 has been released
slug: lawman-5-2-0-has-been-released
date: 2026-10-04T22:00:00.000Z
tags:
  - packages
  - development
  - saloonphp
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1759373247456-49cc5f02b408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000
feature_image_credit:
  name: Judy Beth Morris
  profile_url: https://unsplash.com/@judy-beth-morris?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/photos/qwCm0vIcG04?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Lawman 5.2.0 adds 27 new Pest expectations for SaloonPHP architecture tests,
  covering auth variants, Solo requests, DTOs, middleware, pagination, and more.
  That brings the total to 78 helpers, with no breaking changes.
---

<!-- Never use the — character (em dash). Prefer commas, colons, or a normal hyphen (-). -->
<!-- British English only. No American spellings or idioms (pep talk, gotten, summarize, favorite, color, reach out). -->

[SaloonPHP](https://docs.saloon.dev/) integrations are a joy to write. Architecture tests for them should feel the same. [Lawman](https://github.com/JonPurvis/lawman) is my [PestPHP](https://pestphp.com/) plugin that adds readable expectations for the shape of your connectors, requests, authenticators, and the rest of the Saloon surface. Today I'm releasing **5.2.0**: 27 new helpers, bringing the total to **78**.

## Why this release

Saloon has grown a lot of architecture surface over the last few releases: more auth variants, Solo requests, DTOs, middleware, resources, delays, API versioning, pagination extras. Lawman had fallen behind that class-shape surface. 5.2.0 closes the gap.

This is a minor release from 5.1.0. Additive only: no breaking changes to existing helpers. If your suite already passes on 5.1.0, it still should.

Lawman is about class architecture. It does not cover runtime behaviour such as mocking, recording, pools, or Laravel facades. Use it to pin down that a connector uses multiple authenticators, a request is Solo and builds a DTO, or a class is response middleware, then leave the behavioural tests to Pest (and Saloon) as usual.

## Before and after

Without Lawman, checking a multi-auth connector and a custom authenticator tends to look like a pile of `toExtend` / `toUse` / reflection-style noise. With the new helpers, the intent reads out loud:

```php
test('connector')
    ->expect(ForgeConnector::class)
    ->toBeSaloonConnector()
    ->toUseMultipleAuthenticators()
    ->toUseCertificateAuthentication()
    ->toUseTokenAuthentication();

test('authenticator')
    ->expect(ForgeAuthenticator::class)
    ->toBeSaloonAuthenticator();
```

Same idea for Solo requests and DTOs:

```php
test('solo request')
    ->expect(GetPokemonRequest::class)
    ->toBeSoloRequest()
    ->toHaveEndpoint()
    ->toCreateDtoFromResponse();

test('dto')
    ->expect(Server::class)
    ->toBeSaloonDto();
```

And for pagination markers plus middleware:

```php
test('request')
    ->expect(ListServersRequest::class)
    ->toBePaginatable();

test('middleware')
    ->expect(LogResponse::class)
    ->toBeResponseMiddleware();
```

## What's new in 5.2.0

Twenty-seven new expectations. Full list below, grouped by category. With these, Lawman ships **78** helpers in total.

### Authentication

- `toUseDigestAuthentication`
- `toUseMultipleAuthenticators`
- `toUseAccessTokenAuthentication`
- `toUseNullAuthentication`
- `toBeSaloonAuthenticator`
- `toBeOAuthAuthenticator`

### Connector / SDK / lifecycle

- `toHaveDefaultAuth`
- `toHaveDefaultOauthConfig`
- `toBeSaloonResource`
- `toHaveBootMethod`
- `toHandlePsrRequest`
- `toHaveDefaultSender`

### Pagination

- `toBePaginatable`
- `toUseAsyncPagination`
- `toMapPaginatedResponseItems`

### Properties / retry / delay

- `toHaveDefaultDelay`
- `toHaveCustomRetryHandling`

### Request

- `toSendQueryRequest`
- `toBeSoloRequest`
- `toHaveEndpoint`
- `toCreateDtoFromResponse`

### Response / DTO / middleware

- `toBeSaloonDto`
- `toBeRequestMiddleware`
- `toBeResponseMiddleware`

### Traits / OAuth / plugins

- `toUseClientCredentialsBasicAuthGrantTrait`
- `toUseRequiresAuthTrait`
- `toUseApiVersionTrait`

## Requirements and compatibility

- PHP 8.3+
- Pest 4 or 5

```bash
composer require jonpurvis/lawman --dev
```

Lawman's own test suite now requires `saloonphp/saloon` `^4.5` as a dev dependency so prefer-lowest CI can exercise helpers that need newer Saloon APIs. Consumers on older Saloon 4.x can still use Lawman. Only helpers that depend on newer Saloon APIs need those versions. For example, `toUseApiVersionTrait` needs Saloon 4.5+, and `toSendQueryRequest` needs `Method::QUERY` from Saloon 4.2+.

Lawman also ships a PHPStan extension so the expectations are recognised in analysis. If you use `phpstan/extension-installer`, it should register automatically. Otherwise include `vendor/jonpurvis/lawman/extension.neon` in your PHPStan config.

Docs live at [docs.saloon.dev/installable-plugins/lawman](https://docs.saloon.dev/installable-plugins/lawman). GitBook can lag a little behind a release; the [GitHub README](https://github.com/JonPurvis/lawman) is the current source of truth.

## Upgrade, star, contribute

If you already use Lawman, bump to 5.2.0 and pick up the helpers that match the Saloon features you already ship. If you are new to it, install with the command above and start with the connector and request you care about most.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/JonPurvis/lawman" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">GitHub - JonPurvis/lawman</div>
<div class="bookmark-card-description">A PestPHP plugin to help with architecture testing for SaloonPHP integrations.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/JonPurvis/lawman" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

Stars and issues are welcome. If you spot a Saloon class shape that still has no expectation, open a PR with a fixture and a test: that is how most of these helpers land.

```bash
composer require jonpurvis/lawman --dev
```

- [Packagist](https://packagist.org/packages/jonpurvis/lawman)
- [GitHub](https://github.com/JonPurvis/lawman)
- [Saloon docs (Lawman)](https://docs.saloon.dev/installable-plugins/lawman)
- [Pest docs](https://pestphp.com/docs)
