---
title: Laravel Pulse now supports `use_upsert_alias`
slug: laravel-pulse-now-supports-use_upsert_alias
date: 2026-05-24T20:43:00.000Z
updated: 2026-06-13T20:44:32.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1516434593931-42aaf04e6ef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDh8fGJ1Z3xlbnwwfHx8fDE3ODEzODMzODJ8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: James Wainscoat
  profile_url: https://unsplash.com/@tumbao1949?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  We hit a bit of a bug in a couple of our Shopify Apps this week. We use Laravel Pulse and realised
  that for a couple of them, the dashboard was completely empty. This meant that we weren't getting
  alerts for issues…
---

We hit a bit of a bug in a couple of our Shopify Apps this week. We use Laravel Pulse and realised that for a couple of them, the dashboard was completely empty. This meant that we weren't getting alerts for issues including stuck jobs and other things we have configured.

I eventually tracked this down to a change I'd made earlier in the year, to support MySQL 8.4. This version of MySQL deprecates using `VALUES` in an upsert query. A [PR was merged](https://github.com/laravel/framework/pull/42053) into the framework several years ago which added the ability to use the alias instead of `VALUES` by setting `use_upsert_alias` to true inside your `database.php` config file.

Turns out, Laravel Pulse didn't work with that set to `true` and when running the ingest, our 2 apps that do use the alias were erroring with

> \[previous exception\] \[object\] (PDOException(code: 23000): SQLSTATE\[23000\]: Integrity constraint violation: 1052 Column 'value' in field list is ambiguous

So, I put together [a PR](https://github.com/laravel/pulse/pull/511) which updates a bunch of queries, only when `use_upsert_alias` is set to true. Taylor merged it and hopefully it will get released soon!

<aside class="callout callout-info">
<strong>13th June 2026</strong>
<p>I've just noticed that this fix was released as part of <a href="https://github.com/laravel/pulse/releases/tag/v1.7.4">v1.7.4</a>, so make sure you're apps are using that version!</p>
</aside>
