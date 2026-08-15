---
title: Laravel Uninspire
slug: laravel-uninspire
date: 2023-08-19T15:16:00.000Z
updated: 2026-03-29T14:53:13.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1507388644107-ce16cdf15eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGdsb29teXxlbnwwfHx8fDE3NzQ3OTU5ODl8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Ruslan Valeev
  profile_url: https://unsplash.com/@postrobotbox?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  If you're familiar with Laravel, then you might be aware of the classic php artisan inspire
  command. It's a pretty simple command that outputs an inspirational quote when executed. I'd like
  to introduce you to a package…
---

If you're familiar with Laravel, then you might be aware of the classic `php artisan inspire` command. It's a pretty simple command that outputs an inspirational quote when executed.

I'd like to introduce you to a package I created, called [Laravel Uninspire](https://github.com/JonPurvis/laravel-uninspire). It's an *incredibly* simple package to use, if you install it by running:

```bash
composer require jonpurvis/laravel-uninspire
```

And then execute the following in your terminal:

```bash
php artisan uninspire
```

You'll get a humourous un-inspirational quote, to help you on your way! Some examples of quotes you could get:

> Why be fearless when you can fear everything?

> Why innovate when you can stagnate?

> Why put in effort when you can just put in the minimum required?

There's about 200 possible quotes you could get. If you'd like to contribute your own quotes, feel free to submit a Pull Request!

This is the first package I've built specifically for Laravel and it was a good learning curve.
