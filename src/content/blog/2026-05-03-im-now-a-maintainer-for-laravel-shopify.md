---
title: I'm now a maintainer for Laravel Shopify
slug: im-now-a-maintainer-for-laravel-shopify
date: 2026-05-03T00:51:00.000Z
updated: 2026-05-04T00:52:18.000Z
tags:
  - packages
  - development
feature_image: >-
  https://images.unsplash.com/photo-1471958680802-1345a694ba6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE1fHxvcGVuJTIwc291cmNlfGVufDB8fHx8MTc3Nzc5NzMxN3ww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Matt Foxx
  profile_url: https://unsplash.com/@foxxmd?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I'm excited to announce that I'm now a maintainer for the Laravel Shopify package. This is a
  package that I'm using heavily at work so I have a vested interest in ensuring it lives on. I've
  already worked on a couple of…
---

I'm excited to announce that I'm now a maintainer for the [Laravel Shopify](https://github.com/Kyon147/laravel-shopify) package. This is a package that I'm using heavily at work so I have a vested interest in ensuring it lives on.

I've already worked on a couple of things for it such as adding the ability to [support offline access token refresh](https://github.com/Kyon147/laravel-shopify/pull/471), which Shopify made mandatory for new apps as of April 2026, and also dropped support for older PHP versions and added support for [Laravel 13 and PHP85](https://github.com/Kyon147/laravel-shopify/pull/475). Most recently, I [added some guidelines](https://github.com/Kyon147/laravel-shopify/pull/480) for those using the package with Laravel Boost, to help AI agents work better with the package.

For housekeeping, I've closed a couple of Pull Requests that were out of date or had no context. I did the same with issues too! I'll most likely start going through open PRs in the next couple of weeks as it would be nice to get them to zero before tackling any of the issues.

I also want to take a look at refactoring the codebase so it's more modern. For example, it uses the `funeralzone/valueobjects` package to allow enum classes to exist, however, enum classes have been native to PHP since PHP 8.1, so rather than relying on a package, I'm going to convert them to use the native enum class PHP now has.

I'm very excited to be able to help push the package forward and seeing where we go with it!
