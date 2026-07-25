---
title: Announcing Faker Stripe
slug: announcing-faker-stripe
date: 2023-05-17T14:40:00.000Z
updated: 2026-03-29T14:51:49.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1521114978264-2223e08aa0d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fHN0cmlwZXxlbnwwfHx8fDE3NzQ3OTU5MDN8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Constantin
  profile_url: https://unsplash.com/@switteerr?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Making my own PHP package is something I've wanted to do for the longest time but there was 2
  things stopping me: 1. My own confidence 2. Having an idea that's worthy of a package Fortunately,
  I've been working on the…
---

Making my own PHP package is something I've wanted to do for the longest time but there was 2 things stopping me:

1.  My own confidence
2.  Having an idea that's worthy of a package

Fortunately, I've been working on the first point for a number of months, actively engaging in the PHP Twitter community by voicing my opinion on things, sharing my thoughts and also sharing the odd handy code sample. I also eventually had an idea for a package that I'd find useful in several of my projects and I hoped other people would find useful too.

So what's the idea? Well, a provider for FakerPHP that generates Stripe IDs that you'd expect to be returned from their API. Previously, in my seeders and tests, I'd been doing stuff like below in my Laravel apps:

```php
<?php

echo 'acct_'.Str::random(16);
```

So this would get me what I need, a string similar to an account ID that Stripe would return. It looks messy though, imagine having a file full of these? 🤮

With Faker Stripe, you can do:

```php
<?php

$faker = Factory::create();
$faker->addProvider(new Stripe($faker));

echo $faker->stripeConnectAccountId();
```

💅 I feel like it's a much nicer way of generating Stripe IDs and it's a lot clearer to see what the ID actually is.

If you want to check the package out, it's over [on GitHub](https://github.com/JonPurvis/faker-stripe) so feel free to head over there, download it and take it for a spin. I'm checking the Stripe docs every so often so I can ensure it's kept up to date too.
