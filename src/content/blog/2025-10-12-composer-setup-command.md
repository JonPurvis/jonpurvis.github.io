---
title: Composer `setup` Command
slug: composer-setup-command
date: 2025-10-12T16:59:00.000Z
updated: 2026-06-13T17:00:23.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1730382625230-3756013c515c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGJ1aWxkaW5nJTIwYmxvY2tzfGVufDB8fHx8MTc4MTM3MDAxMHww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Imagine Buddy
  profile_url: https://unsplash.com/@imaginebuddy?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Did you know that composer has a setup command, in which you can define commands in your
  composer.json file to help users get started once they've pulled down your app for the first time?
  Taylor Otwell recently added…
---

Did you know that composer has a setup command, in which you can define commands in your `composer.json` file to help users get started once they've pulled down your app for the first time?

Taylor Otwell recently added this to the Laravel `composer.json` file, which makes total sense to help new Laravel users get set up quickly. This is what was added:

```json
"setup": [
    "composer install",
    "@php -r \"file_exists('.env') || copy('.env.example', '.env');\"",
    "@php artisan key:generate",
    "@php artisan migrate --force",
    "npm install",
    "npm run build"
]
```

These commands are all commands you can run individually in your command line, but why bother when you can just run `composer setup` and have them ran for you!

I've been thinking about bringing this into all of our Shopify apps, to make onboarding to a new app easier for the team. I'll make a future post about how I get on with this!
