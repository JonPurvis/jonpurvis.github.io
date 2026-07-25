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
  I recently announced that I've became a maintainer for the Laravel Shopify package: One of
  the things I'm heavily invested in is making the codebase more modern. Especially now
  since we've dropped < PHP83 and < Laravel…
---

I recently announced that I've became a maintainer for the Laravel Shopify package:

<figure class="bookmark-card">
<a class="bookmark-card-link" href="/im-now-a-maintainer-for-laravel-shopify/">
<div class="bookmark-card-content">
<div class="bookmark-card-title">I'm now a maintainer for Laravel Shopify</div>
<div class="bookmark-card-description">I'm excited to announce that I'm now a maintainer for the Laravel Shopify package. This is a package that I'm using heavily at work so I have a vested interest in ensuring it…</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="/favicon.png" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">Jon Purvis</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://images.unsplash.com/photo-1471958680802-1345a694ba6d?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHxvcGVuJTIwc291cmNlfGVufDB8fHx8MTc3Nzc5NzMxN3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=2000" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

One of the things I'm heavily invested in is making the codebase more modern. Especially now since we've dropped < PHP83 and < Laravel 12. This means we can now start using some of the nice features that PHP has.

One of these is enums, which were actually introduced in PHP81, but now seems like a good time to start using them. The package does actually have the concept of enums, but it's via the `funeralzone/valueobjects` package.

So my plan is, to convert all of the classes to use native PHP enums as a step to eventually drop `funeralzone/valueobjects` as a dependency. Whilst it's served the package well, I don't believe we actually need it anymore and having one less dependency is always a good thing!
