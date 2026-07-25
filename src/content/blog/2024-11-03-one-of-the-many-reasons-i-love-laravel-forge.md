---
title: One of the many reasons I love Laravel Forge
slug: one-of-the-many-reasons-i-love-laravel-forge
date: 2024-11-03T16:41:00.000Z
updated: 2026-03-29T15:08:49.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1547555706-54bcf05bbad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDR8fGZvcmdlfGVufDB8fHx8MTc3NDc5NjkyNXww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Francisco Fernandes
  profile_url: https://unsplash.com/@franciscofernandes?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  If you've seen my previous posts, you may know that I'm currently helping out on a SaaS product. I
  chose Laravel Forge as the server provisioning tool because the less time I spend messing around
  with servers, the more…
---

If you've seen my previous posts, you may know that I'm currently helping out on a SaaS product. I chose [Laravel Forge](https://forge.laravel.com/) as the server provisioning tool because the less time I spend messing around with servers, the more time I can spend building the actual application, it's a win win situation.

Up until today, I had 1 server running 1 website, and it ran extremely well. I was asked whether we could spin up another version of the product to act as a "demo" of it. Of course, this was possible. I had to make several changes to the application to handle a demo environment such as:

*   Adding a set of specific seeder data
*   Adding a command that would run the seeder data every day to "reset" the application
*   Auto log in with the user created via the seeder

I then had to set up another site. I could've spun up a whole new server just for the demo, but that seemed like overkill so instead, I simply set up a new site on the existing server, via Laravel Forge.

That's all I needed to do! There was absolutely no need for me to mess around with things like NGINX configuration files, to make sure that if you visit the demo url, NGINX loads the correct folder, Laravel Forge takes care of all of that stuff.

I'd love to be able to work out just how much time Laravel Forge has saved me when it comes to managing servers. I think it's safe to say, I'd never work on another SaaS product without it!
