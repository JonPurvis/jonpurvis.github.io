---
title: Profanify is in Pest V4
slug: profanify-is-in-pest-v4
date: 2025-08-24T01:12:00.000Z
updated: 2026-05-04T01:13:06.000Z
tags:
  - development
  - pestphp
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1557159557-7a93eaadf72a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE4fHxyb2FkfGVufDB8fHx8MTc3Nzg1NzE3M3ww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Meriç Dağlı
  profile_url: https://unsplash.com/@meric?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I'm super proud to announce that Profanify, my Profanity checker for PestPHP, has been added to
  the core of PestPHP for V4! This isn't something I ever planned on happening, but back in April I
  got a DM fron Nuno Maduro…
---

I'm super proud to announce that Profanify, my Profanity checker for [PestPHP](https://pestphp.com/), has been added to the core of PestPHP for V4!

This isn't something I ever planned on happening, but back in April I got a DM fron [Nuno Maduro](https://x.com/enunomaduro) on Twitter, which then turned into a discord conversation where he asked what I thought about adding my plugin into Pest v4, so it was included by default.

I jumped at the opportunity and it actually prompted me to rewrite the plugin how I always wanted it to work, in that it wasn't an Expectation test, it was a CLI flag, so it now works like this:

```php
./vendor/bin/pest --profanity
```

Of course, you can still include certain words or exclude certain words etc. but it definitely works a lot nicer now and it's consistent with other plugins for PestPHP.

I have marked `jonpurvis/profanify` as abandoned, so if you were using that, you should swap it to `pestphp/pest-plugin-profanity`. Much like before, contributions are still open and I'll still be maintaining it, but it now lives under the PestPHP umbrella.
