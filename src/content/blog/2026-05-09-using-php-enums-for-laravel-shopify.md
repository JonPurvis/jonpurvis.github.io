---
title: Using PHP Enums for Laravel Shopify
slug: using-php-enums-for-laravel-shopify
date: 2026-05-09T23:41:00.000Z
updated: 2026-05-10T23:41:59.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1516556878440-129be5a6c538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHJvYWQlMjBhaGVhZHxlbnwwfHx8fDE3Nzg0NTY1MDJ8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Xan White
  profile_url: https://unsplash.com/@xwpics?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I recently announced that I've became a maintainer for the Laravel Shopify package: I’m now a
  maintainer for Laravel ShopifyI’m excited to announce that I’m now a maintainer for the Laravel
  Shopify package. This is a…
---

I recently announced that I've became a maintainer for the Laravel Shopify package:

[

I’m now a maintainer for Laravel Shopify

I’m excited to announce that I’m now a maintainer for the Laravel Shopify package. This is a package that I’m using heavily at work so I have a vested interest in ensuring it lives on. I’ve already worked on a couple of things for it such as adding the ability

![](https://static.ghost.org/v5.0.0/images/link-icon.svg)Jon PurvisJon Purvis

![](/images/posts/using-php-enums-for-laravel-shopify/inline-01.jpg)

](/im-now-a-maintainer-for-laravel-shopify/)

One of the things I'm heavily invested in is making the codebase more modern. Especially now since we've dropped < PHP83 and < Laravel 12. This means we can now start using some of the nice features that PHP has.

One of these is enums, which were actually introduced in PHP81, but now seems like a good time to start using them. The package does actually have the concept of enums, but it's via the `funeralzone/valueobjects` package.

So my plan is, to convert all of the classes to use native PHP enums as a step to eventually drop `funeralzone/valueobjects` as a dependency. Whilst it's served the package well, I don't believe we actually need it anymore and having one less dependency is always a good thing!
