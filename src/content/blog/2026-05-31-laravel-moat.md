---
title: Laravel Moat
slug: laravel-moat
date: 2026-05-31T18:33:00.000Z
updated: 2026-06-13T18:43:48.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1589360395642-bfb140284700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fG1vYXR8ZW58MHx8fHwxNzgxMzc1NjM4fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Colin Watts
  profile_url: https://unsplash.com/@colinwatts?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I've been on a bit of a security drive recently, what with all of the recent supply chain attacks
  happening in the NPM and Composer worlds. Laravel recently unveiled a new package called Moat,
  which reviews the security…
---

I've been on a bit of a security drive recently, what with all of the recent supply chain attacks happening in the NPM and Composer worlds. Laravel recently unveiled a new package called Moat, which reviews the security of your GitHub organisations and repositories.

Whilst controls for these do exist on GitHub, they're not always the easiest to find, so it's entirely possible when setting up a new repo, you forget to toggle a setting on or off. Luckily, Moat has you covered!

Moat comes with a ton of checks, which include:

*   2FA
*   Branch protection
*   Signed commits
*   Immutable releases

Moat (when it's ran) will give you an explanation of the risk, if something is failing along with a standard PASS or FAIL score.

You can customise the checks on a per repo basis, by adding a `moat.toml` file into the root of your project. This is useful if you wish to disable certain checks from running.

You can check Moat out on Github [here](https://github.com/laravel/moat).
