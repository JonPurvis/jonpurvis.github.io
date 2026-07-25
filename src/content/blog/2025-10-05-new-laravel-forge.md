---
title: New Laravel Forge
slug: new-laravel-forge
date: 2025-10-05T15:18:00.000Z
updated: 2026-06-14T15:18:38.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1537557209696-c595cc42018d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGZvcmdlfGVufDB8fHx8MTc4MTQ1MDMxM3ww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Hannah Gibbs
  profile_url: https://unsplash.com/@hannahmgibbs?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I've been using Laravel Forge for a couple of years now and it has always been an amazing product.
  It takes so much stress out of managing servers, believe me, I've been there and done it! Laravel
  have given Laravel…
---

I've been using [Laravel Forge](https://laravel.com/forge) for a couple of years now and it has always been an amazing product. It takes so much stress out of managing servers, believe me, I've been there and done it!

Laravel have given Laravel Forge a lot of love recently and introduced a whole host of new features.

I won't go into every single new feature, but I will highlight some of my favourites:

## **Revamped UI**

I never thought there was anything wrong with the Forge UI, however there were definitely some things hidden away which required some extra clicks. The UI now reflects how the Laravel Cloud UI is, which is a welcomed addition as I love that UI.

## Zero Downtime Deployments

This is **huge** for Laravel Forge. It means that if you were using [Laravel Envoyer](https://envoyer.io/) for zero downtime deployments, there's now no need. You can now use Forge for the same benefit and a lot more too! I'm interested to see if in the next couple of years, Laravel Envoyer is still around. Perhaps they'll migrate sites over to Laravel Forge instead?

## Heartbeats

You can now set up heartbeat URLs for your scheduled tasks to ping, to alert Laravel Forge that are healthy! I previously used [OhDear](https://ohdear.app/) for this for one of my applications, but given that same application also uses Laravel Forge, I moved all of my heartbeats over to that. It also meant I could drop a couple of composer dependencies.

## Command Palette

These are definitely becoming more popular and I'm glad Forge has introduced a command palette. Simply press ⌘K and do what you need to do!

* * *

I'm glad even with the launch of [Laravel Cloud](https://laravel.com/cloud), that the Laravel team is still investing time making Laravel Forge as good as it can be. I can definitely see a world where both products exist. Laravel Envoyer though, I'm now not so sure!
