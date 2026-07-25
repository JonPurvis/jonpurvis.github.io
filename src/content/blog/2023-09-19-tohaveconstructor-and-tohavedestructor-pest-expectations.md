---
title: PestPHP `toHaveConstructor()` and `toHaveDestructor()` Expectations
slug: tohaveconstructor-and-tohavedestructor-pest-expectations
date: 2023-09-19T22:55:46.000Z
updated: 2026-03-29T15:05:49.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1600368544663-05493ab49549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDIxfHxjb2dzfGVufDB8fHx8MTc3NDc5NTcxMHww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: David Hofmann
  profile_url: https://unsplash.com/@davidhoffelhass?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This past weekend, I decided to add a couple more Architecture Expectations to PestPHP. I spent
  some time last week writing Arch tests for an internal tool at work and found myself writing the
  following expectation…
---

This past weekend, I decided to add a couple more [Architecture Expectations](https://pestphp.com/docs/arch-testing#content-expectations) to [PestPHP](https://pestphp.com/). I spent some time last week writing Arch tests for an internal tool at work and found myself writing the following expectation quite a lot:

```php
->toHaveMethod('__construct');
```

Now whilst this works, it didn't feel very fluent. I felt there was a much better way of doing this, so I thought about being able to instead do something like:

```php
->toHaveConstructor();
```

or

```php
->toHaveDestructor();
```

So that's what I did! [This PR](https://github.com/pestphp/pest/pull/962) adds them in, clocking in at a whopping 94 lines of code 🤣

Under the hood, it's incredibly simple as it just calls the thing I was trying to avoid writing in the first place. You can consider these more like handy alias'.

[Nuno Maduro](https://twitter.com/enunomaduro) merged this change into the core of PestPHP and it was released as [v2.19](https://github.com/pestphp/pest/releases/tag/v2.19.0)!

If you end up using these in your tests, let me know!
