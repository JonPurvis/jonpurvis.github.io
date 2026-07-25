---
title: I added some additional Expectations to PestPHP
slug: i-added-some-additional-expectations-to-pestphp
date: 2023-09-09T12:39:04.000Z
updated: 2024-08-04T12:42:22.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHBocHxlbnwwfHx8fDE2OTQyNjMwODJ8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Ben Griffiths
  profile_url: https://unsplash.com/@benofthenorth?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  If you're familiar with PestPHP, then you might also be familiar with the Expectations API that
  comes with it. It's a super handy way of being able to pass in a value, and expect various things
  from it. For example, you…
---

If you're familiar with [PestPHP](https://pestphp.com/), then you might also be familiar with the [Expectations API](https://pestphp.com/docs/expectations) that comes with it. It's a super handy way of being able to pass in a value, and expect various things from it. For example, you could expect it to be a string, or an int, or an array etc... You can also chain them together too.

In any project I use PestPHP in, I always use expectations. Last month, I found myself at a point where I was missing some that I'd find useful, so with PestPHP being open-source, I put together [a Pull Request](https://github.com/pestphp/pest/pull/906) to add the following Expectations:

*   `toBeUppercase()`
*   `toBeLowercase()`
*   `toBeAlphaNumeric()`
*   `toBeAlpha()`

You can then use them in your tests like so:

```php
it('succeeds if uppercase', function () {
    expect('UPPERCASE')->toBeUppercase();
});

it('succeeds if lowercase', function () {
    expect('lowercase')->toBeLowercase();
});

it('succeeds if alpha', function () {
    expect('abc')->toBeAlpha();
});

it('succeeds if alphanumeric', function () {
    expect('abc123')->toBeAlphaNumeric();
});

it('succeeds if not uppercase', function () {
    expect('lowercase')->not->toBeUppercase();
});

it('succeeds if not lowercase', function () {
    expect('UPPERCASE')->not->toBeLowercase();
});

it('succeeds if not alpha', function () {
    expect('123')->not->toBeAlpha();
});

it('succeeds if not alphanumeric', function () {
    expect('-')->not->toBeAlphaNumeric();
});
```

The PR was merged so if you're using PestPHP right now, you have access to these Expectations! I find them useful, let me know if you're using them in any of your projects!
