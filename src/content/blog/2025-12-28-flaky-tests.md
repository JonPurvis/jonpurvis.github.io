---
title: Flaky Tests
slug: flaky-tests
date: 2025-12-28T19:03:00.000Z
updated: 2026-04-11T18:03:20.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1457269449834-928af64c684d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fHNub3clMjBmbGFrZXN8ZW58MHx8fHwxNzc1OTMwNTc4fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Aaron Burden
  profile_url: https://unsplash.com/@aaronburden?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  If you're writing tests for your application, you've probably came across tests that both pass and
  fail. These are known as flaky tests and can be quite hard to track down, especially if they only
  fail 1 in 100 or 1 in…
---

If you're writing tests for your application, you've probably came across tests that both pass and fail. These are known as flaky tests and can be quite hard to track down, especially if they only fail 1 in 100 or 1 in 1000 times.

Flaky tests can definitely be a nightmare, especially if you're running your test suite as part of a CI/CD pipeline and the whole pipeline stops because of a test that was passing for you locally and will most likely pass if you re-run your pipeline.

I have a tip to help you deal with flaky tests, if you're using PestPHP, I highly recommend using the `repeat()` option on a test that you suspect is flaky. This has been an absolute life saver for me. I usually do `repeat(100)`. This way you can see just how flaky a test is and then begin the steps of resolving it.

Don't forget to remove `repeat()` once you're done with it! I think it would be a good idea for PestPHP to offer automatic re-runs of failed tests!
