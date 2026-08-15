---
title: Integration Prompts for SaloonPHP
slug: integration-prompts-for-saloonphp
date: 2025-11-23T00:07:00.000Z
updated: 2026-04-12T23:07:36.000Z
tags:
  - development
  - saloonphp
feature_image: >-
  https://images.unsplash.com/photo-1550444274-411f55d39af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fHdpbGQlMjB3ZXN0fGVufDB8fHx8MTc3NjAzNTIzN3ww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Ben Emrick
  profile_url: https://unsplash.com/@benemrick?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I've been using SaloonPHP for a while and one of the things I've always wanted to improve is when
  it comes to selecting the integration you want to add a connector, request, plugin etc to. This
  was a manual typing job…
---

I've been using SaloonPHP for a while and one of the things I've always wanted to improve is when it comes to selecting the integration you want to add a connector, request, plugin etc to.

This was a manual typing job and the amount of times I'd accidentally misspell an existing integration was too many to count. This meant that I'd end up with another directory for an integration I didn't meant to create.

Enter, Laravel Prompts...

This week I hacked on an idea using Laravel Prompts which scans your existing integrations and allows you to select from them *or* create a new integration, like before:

![](/images/posts/integration-prompts-for-saloonphp/inline-01.png)

This is the exact thing Laravel Prompts should be used for! It was ~100 lines of code to get this working and IMO massively improves developer experience when using Saloon. It means I'm way less likely to misspell an integration name again!
