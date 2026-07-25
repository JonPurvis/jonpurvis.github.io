---
title: How to check for leftover debug code with Pest
slug: how-to-check-for-leftover-debug-code-with-pest
date: 2023-07-22T00:22:00.000Z
updated: 2024-08-04T12:41:48.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1618939404235-8747e5c37089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE5fHxkZWJ1Z2dpbmd8ZW58MHx8fHwxNjkzNjE0MTI1fDA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Sigmund
  profile_url: https://unsplash.com/@sigmund?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  We've all done it, committed to Git with a rouge dd() in our code, or perhaps some other function
  that's used for debugging. Fortunately, using PestPHP, there's a nice way of being able to catch
  these, so if you run…
---

We've all done it, committed to Git with a rouge `dd()` in our code, or perhaps some other function that's used for debugging. Fortunately, using PestPHP, there's a nice way of being able to catch these, so if you run tests as part of a CI/CD pipeline, then your test suite should fail if your codebase contains any. Let's have a look at the code.

So this is using the awesome [Architecture Testing](https://pestphp.com/docs/arch-testing) that comes with PestPHP, it makes writing tests like this an absolute breeze. In my app, I simply have the following test within a `tests/ArchitectureTest.php` file:

```php
test('the codebase does not contain debug statements')    
->expect(['dd', 'dump', 'var_dump', 'ddd', 'print_r', 'die', 'print'])
->not->toBeUsed();
```

So this scans my codebase and looks for any of those functions. If it finds any, the test fails.
