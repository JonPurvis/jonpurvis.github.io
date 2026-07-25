---
title: Trying out Vitest
slug: trying-out-vitest
date: 2026-01-11T17:34:00.000Z
updated: 2026-04-11T16:35:11.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1554475901-4538ddfbccc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGV4cGVyaW1lbnR8ZW58MHx8fHwxNzc1OTI1Mjg5fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Alex
  profile_url: https://unsplash.com/@alexkondratiev?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  For our Shopify Apps at work, we have a fantastic PHP test suite for each one, using PestPHP to
  power them and we maintain 90% coverage. One of the gaps though is Javascript testing. We've had a
  couple of issues come up…
---

For our Shopify Apps at work, we have a fantastic PHP test suite for each one, using PestPHP to power them and we maintain 90% coverage. One of the gaps though is Javascript testing. We've had a couple of issues come up recently that no Pest test would catch it, but if we had front-end tests, then we would've caught them.

So I started looking around, admittedly, I'd never heard of Vitest before, but given all of our apps use Vite, it seemed like the most natural fit! I integrated it into one of our apps and had Cursor go through the whole code and come up with a set of high level tests, which would catch the couple of Javascript issues we'd previously had.

After a bit of back and forth, I had what I'd consider a decent Javascript testing suite! Writing tests in Vitest isn't too different from Pest, they both use the `it()` syntax, I did dabble with coverage for Vitest using a tool called V8, but I ended up disabling it for now.

Last thing to do was get Vitest to run as part of our CI/CD pipeline. As it was fairly new to us, I opted to not have it affect our coverage report and left that purely for our Pest test suites. We'll most likely only lean for Vitest when we need to test something that is mission critical and Pest can't test it.
