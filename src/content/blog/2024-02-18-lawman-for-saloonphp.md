---
title: Lawman for SaloonPHP
slug: lawman-for-saloonphp
date: 2024-02-18T12:13:00.000Z
updated: 2026-03-29T15:14:17.000Z
tags:
  - development
  - saloonphp
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1516926133025-705ee504386d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHdpbGQlMjB3ZXN0fGVufDB8fHx8MTc3NDc5NzI1NHww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Cayetano Gil
  profile_url: https://unsplash.com/@cytngl?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  So SaloonPHP received a new plugin this week! The plugin is called Lawman and well, actually, it's
  a PestPHP plugin for SaloonPHP. Saloon and Pest are two of the PHP libraries that I used on a
  daily basis, and I thought…
---

So [SaloonPHP](https://docs.saloon.dev/) received a new plugin this week! The plugin is called [Lawman](https://docs.saloon.dev/installable-plugins/lawman) and well, actually, it's a [PestPHP](https://pestphp.com/) plugin for SaloonPHP. Saloon and Pest are two of the PHP libraries that I used on a daily basis, and I thought it was about time they met each other!

I wanted to keep with the naming convention that Saloon uses, so it had to have a wild west name for it. I honestly didn't think too hard about the name, I was thinking about how the package "enforces" certain architectural rules and then naturally got onto the Law and then Lawman. You can think of this package as:

> Your architectural enforcer for your SaloonPHP integrations

So, why did I build it?

I'm a massive fan of architecture testing with Pest and I think it's super important that your application is tested from an architectural persepctive, instead of *only* a feature perspective.

The application that prompted me to create this package did actually already have arch tests for my Saloon integrations, but I found them quite hard to read, they weren't consistent and I wanted a way of making them easier to write, using PestPHP as a foundation.

Lawman is pretty simple, it essentially adds a set of Saloon specific Expectations to Pest, that you can then use in your application. You can mix and match them with regular Pest Expectations too, so if you have an existing Pest test library, this will fit in seamlessly

So let's say I have a `Connector` and want to test it, with PestPHP I could do:

```php
test('connector')
    ->expect('App\Http\Integrations\Integration\Connector')
    ->toExtend('Saloon\Http\Connector')
    ->toUse('Saloon\Traits\Plugins\AcceptsJson')
    ->toUse('Saloon\Traits\Plugins\AlwaysThrowOnErrors');
```

So that test is ensuring our class extends the base Connector and uses the \`AcceptJson\` and \`AlwaysThrowOnErrors\` traits. Whilst that test works, we could perhaps make it quicker to write and easier to read, so with Lawman, you can do:

```php
test('connector')
    ->expect('App\Http\Integrations\Integration\Connector')
    ->toBeSaloonConnector()
    ->toUseAcceptsJsonTrait()
    ->toUseAlwaysThrowOnErrorsTrait();
```

Next up, let's take a Request test that we have:

```php
test('request')
    ->expect('App\Http\Integrations\Integration\Requests\Request')
    ->toExtend('\Saloon\Http\Request')
    ->toImplement('Saloon\Contracts\Body\HasBody')
    ->toUse('Saloon\Traits\Body\HasFormBody')
    ->toUse('Saloon\Traits\Plugins\AcceptsJson');
```

Lawman makes this test much nicer to read:

```php
test('request')
    ->expect('App\Http\Integrations\Integration\Requests\Request')
    ->toBeSaloonRequest()
    ->toSendPostRequest()
    ->toHaveFormBody()
    ->toUseAcceptsJsonTrait();
```

What about if we want to test our Connector has an Authentication method? Lawman makes this easy to do, it even works with multi auth:

```php
test('connector')
    ->expect('App\Http\Integrations\Integration\Connector')
    ->toBeSaloonConnector()
    ->toUseCertificateAuthentication()
    ->toUseTokenAuthentication();
```

Lawman also has Expectations for the Pagination, Cache and Rate Limit Plugins:

```php
test('request')
    ->expect('App\Http\Integrations\Integration\Requests\Request')
    ->toBeSaloonRequest()
    ->toSendPostRequest()
    ->toUsePagedPagination()
    ->toHaveCaching()
    ->toHaveRateLimits()
```

Maybe our Connector has some Retry instructions that we want to test. Again, with Lawman, it's as simple as:

```php
test('connector')
    ->expect('App\Http\Integrations\Integration\Connector')
    ->toBeSaloonConnector()
    ->toBeTriedAgainOnFailure()
    ->toHaveRetryInterval()
    ->toUseExponentialBackoff()
```

* * *

Lawman was built over the course of a couple of days last weekend. I was already in conversation about something else with [Sam Carré](https://twitter.com/carre_sam) on Twitter so I dropped this into the conversation. Luckily he was instantly a fan! I'm really appreciative of the support Sam gave Lawman and he even offered to have the documentation for it on the official Saloon website! You can check the documentation out [here](https://docs.saloon.dev/installable-plugins/lawman).

Lawman was the first PestPHP plugin I'd built, so whilst the need for Lawman really was to scratch my own itch with testing, it was also a good learning experience to learn about a side of Pest that I'd never really delved into before!

I've already got ideas for some updates I want to do and I shall get to them soon. Any ideas I do have, I will open an issue on the GitHub repo so if anyone else wants to tackle them, they're more than free to do so!

You can find [Lawman on GitHub](https://github.com/JonPurvis/lawman) but if you want to quickly check it out from here, all you need to do is run the following command:

```bash
composer require jonpurvis/lawman --dev
```

I have a few posts about SaloonPHP, so if you'd like to check them out, you can click [here](/tag/saloonphp/) to view them all!
