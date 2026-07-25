---
title: Shopify Reducing JSON Metafields to 16kb
slug: shopify-are-changing-metafield-leng
date: 2026-03-01T19:48:00.000Z
updated: 2026-04-06T18:48:45.000Z
tags:
  - general
feature_image: >-
  https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fENoYW5nZXxlbnwwfHx8fDE3NzU1MDEyNzB8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Javier Allegue Barros
  profile_url: https://unsplash.com/@soymeraki?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Shopify recently announced that they are changing the length of the JSON metafield type from 2MB
  to just 16kb. This change will be coming in to play in their 2026-04 update and although current
  apps will be…
---

Shopify recently announced that they are changing the length of the JSON metafield type from 2MB to just 16kb.

This change will be coming in to play in their 2026-04 update and although current apps will be grandfathered in at the existing 2MB limit, all new apps will need to adhere to the 16kb limit. As a Shopify app developer, this is a serious change!

Their reasoning is by having it at 2MB, it can impact store load times but cutting it down to 16kb seems way too low.

I wouldn’t be surprised if such a drastic change is either reversed completely or changed so that it’s higher than 16kb. I can somewhat see the reasoning for reducing it as metafields are often used beyond their original intention, for example some apps will be using them to store things like PDFs and other files.

I’m already seeing some developers complaining about the change so I’m interested in whether Shopify take note and listen to the community on this.
