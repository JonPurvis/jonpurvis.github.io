---
title: PestPHP `isUrl()` Expectation
slug: pestphp-isurl-expectation
date: 2023-10-14T14:23:41.000Z
updated: 2024-08-04T12:43:02.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDR8fHdlYnxlbnwwfHx8fDE2OTcyOTM0MDJ8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Ales Nesetril
  profile_url: https://unsplash.com/@alesnesetril?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I added another Expectation to PestPHP recently! I'd like to introduce the isUrl() Expectation. As
  you may have guessed, it's to check that a given value is a valid URL. Behind the scenes, the code
  is super simple and…
---

I added another Expectation to [PestPHP](https://pestphp.com/) recently! I'd like to introduce the `isUrl()` Expectation. As you may have guessed, it's to check that a given value is a valid URL.

Behind the scenes, the code is super simple and makes use of the handy `FILTER_VALIDATE_URL` function!

Let's look at an example of how to use it:

```php
<?php

it ('ensures social links are urls', function() {
    expect($user->twitter)->toBeUrl()
        ->and($user->instagram)->toBeUrl()
        ->and($user->linkedin)->toBeUrl();
}
```

Of course, because we're using the Expectation API, we can also check that values are **not** URLs:

```php
<?php

it ('ensures user name is not a url', function() {
    expect($user->name)->not->toBeUrl();
}
```

This is a really fluent way of ensuring certain values are / are not URLs!

You can find the [PR that added it](https://github.com/pestphp/pest/pull/977) on GitHub! It has already been released and was released as v2.22 on October 10th 2023.

🧪
