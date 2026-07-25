---
title: How to check for incorrect env usage in Laravel with Pest
slug: how-to-check-for-incorrect-env-usage-in-laravel-with-pest
date: 2023-07-24T00:32:00.000Z
updated: 2024-08-04T12:42:05.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1484417894907-623942c8ee29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDI3fHxkZXZlbG9wbWVudHxlbnwwfHx8fDE2OTM2MTQ3NTJ8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Emile Perron
  profile_url: https://unsplash.com/@emilep?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  If you're using Laravel, then you should be familiar with the env() helper. This helper allows you
  to get the values from your .env file, or set a value if one doesn't exist. You should only be
  calling env() in config…
---

If you're using Laravel, then you should be familiar with the `env()` helper. This helper allows you to get the values from your .env file, or set a value if one doesn't exist.

You should only be calling `env()` in config files though. When you run `config:cache`, this tells the application to use values from your config files. If you're referencing `env()` in, for example, a Controller, then it'll return `null`.

With this in mind, I have the following test in my applications, which helps me ensure that `env()` isn't used anywhere but config files:

```php
test('the codebase does not reference env variables outside of config files')
    ->expect('env')
    ->not->toBeUsed();
```

So this test will look inside my `/app` directory, and any sub-directories such as Controllers, Providers, Middleware etc... and check them all for `env` usage.

Made possible of course, with the wonderful [Architecture Testing plugin in Pest](https://pestphp.com/docs/arch-testing)
