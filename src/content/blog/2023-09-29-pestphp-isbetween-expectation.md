---
title: PestPHP `isBetween()` Expectation
slug: pestphp-isbetween-expectation
date: 2023-09-29T13:27:00.000Z
updated: 2024-08-04T12:42:47.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1596806082495-fb05004cfe49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fGJldHdlZW58ZW58MHx8fHwxNjk2Njg1MDI0fDA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Justin Dream
  profile_url: https://unsplash.com/@jujudreaminx?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This week in my free time, I've been working on a new Expectation for PestPHP which allows you to
  check whether a value, is between 2 other values. The Expectation works with int, float and
  DateTime types, and can be…
---

This week in my free time, I've been working on a new Expectation for [PestPHP](https://pestphp.com/) which allows you to check whether a value, is between 2 other values.

The Expectation works with `int`, `float` and `DateTime` types, and can be used like so:

```php
// Int
expect(2)->toBeBetween(1, 3);

// Float
expect(1.5)->toBetween(1, 2);

// DateTime
expect(new DateTime('2023-09-22'))->toBeBetween(new DateTime('2023-09-21'), new DateTime('2023-09-23'));
```

Now if you've used PestPHP, you may know about the `not` function, well, you can also use `isBetween()` with that too, to ensure a value is **not** between 2 values:

```php
// Int
expect(4)->not->toBeBetween(1, 3);

// Float
expect(2.1)->not->toBetween(1.5, 1.75);

// DateTime
expect(new DateTime('2023-09-20'))->not->toBeBetween(new DateTime('2023-09-21'), new DateTime('2023-09-23'));
```

I really enjoyed working on this Expectation, you can view the merged Pull Request on GitHub [here](https://github.com/pestphp/pest/pull/968). It will be released in v2.20.

UPDATE: You can now find this Expectation in the [PestPHP Docs](https://pestphp.com/docs/expectations#expect-toBeBetween)!
