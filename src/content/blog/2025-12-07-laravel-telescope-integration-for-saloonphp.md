---
title: Laravel Telescope Integration for SaloonPHP
slug: laravel-telescope-integration-for-saloonphp
date: 2025-12-07T23:49:00.000Z
updated: 2026-04-12T22:51:37.000Z
tags:
  - development
  - saloonphp
feature_image: >-
  https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDMwfHxzYWxvb258ZW58MHx8fHwxNzc2MDM0MTM5fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Patrick Tomasso
  profile_url: https://unsplash.com/@impatrickt?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This week, I've been working on getting Laravel Telescope working with SaloonPHP. This was
  previously doable using the SaloonPHP HTTP Client Sender package but we recently decided to
  abandon this package and instead…
---

This week, I've been working on getting Laravel Telescope working with SaloonPHP. This was previously doable using the [SaloonPHP HTTP Client Sender](https://github.com/saloonphp/laravel-http-sender) package but we recently decided to abandon this package and instead build the functionality into the Laravel plugin.

If you still require `saloonphp/laravel-http-sender` in your project, you can remove it and instead require `saloonphp/laravel-plugin`. You'll need to be on at least v3.8 for Laravel Telescope to work. Once installed, you should start seeing requests through Saloon appear in the HTTP Client tab.

I really wish Laravel Telescope allowed you to define your own watchers. Ideally, I'd have a `SaloonWatcher` which would add a new `Saloon` tab into Telescope. Perhaps this is something I might hack on in my spare time!
