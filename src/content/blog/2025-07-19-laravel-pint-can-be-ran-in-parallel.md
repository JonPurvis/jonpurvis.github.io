---
title: Laravel Pint can be ran in parallel
slug: laravel-pint-can-be-ran-in-parallel
date: 2025-07-19T23:46:00.000Z
updated: 2026-05-10T23:47:11.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1515723959262-56195aae7cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDR8fHBpbnR8ZW58MHx8fHwxNzc4NDU2ODE4fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Seth Weisfeld
  profile_url: https://unsplash.com/@s3th?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  One of my favourite features of PestPHP is the parallel execution, it makes running test suites so
  much quicker. I'm so happy when I found out that the feature now also exists for Pint. Now, Pint
  has always ran pretty…
---

One of my favourite features of PestPHP is the parallel execution, it makes running test suites so much quicker. I'm so happy when I found out that the feature now also exists for Pint. Now, Pint has always ran pretty quick, but if something can make it even quicker, then why not use it?!

As you'd expect, it's super simple to use and can be used by specifying it like so:

```
vendor/bin/pint --parallel
```

I'll be updating my CI/CD pipelines to use it!
