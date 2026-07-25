---
title: Switching from Self-Hosted to Pro
slug: switching-from-self-hosted-to-pro
date: 2026-03-29T11:14:00.000Z
updated: 2026-04-04T11:15:01.000Z
tags:
  - general
feature_image: >-
  https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDMyfHxmdXR1cmV8ZW58MHx8fHwxNzc1MzAxMjY2fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: fabio
  profile_url: https://unsplash.com/@fabioha?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Towards the end of 2021, I decided to rebuild my blog right here, on Ghost. I'd used Ghost before
  and loved it and the only reason I stopped was because I failed to keep up a regular posting
  schedule. Before Ghost I…
---

Towards the end of 2021, I decided to rebuild my blog right here, on Ghost. I'd used Ghost before and loved it and the only reason I stopped was because I failed to keep up a regular posting schedule. Before Ghost I used WordPress, which was definitely an experience and not one I wish to relive!

So in December 2021, I span up a Digital Ocean droplet with a Ghost Integration so the manual effort required to get it installed was pretty minimal and it worked well. I enjoyed being back on Ghost and playing around with the new features they'd added during my hiatus from the platform.

Over the coming years, I tried to keep my instance of Ghost updated as often as I could, they ship a lot! The one thing I could never get working properly was updating Ghost via the Ghost CLI. I think this was a combination of my DO droplet being somewhat out of date and the Ghost CLI not being super helpful. I recently did this a couple of weeks ago, upgrading from V5 to V6 and whilst I did it, it was painful and took me a couple of hours.

This got me thinking about whether I still want to host my own instance of Ghost. Right now, I'm trying to find more ways to become efficient and spending 2+ hours upgrading my blogging platform seemed wasteful. I then started looking into using the Ghost Pro service, which would mean I'd need to do zero upkeep, get new features as they launched and backups would be handled for me.

At the time of writing, here are the tiers. For what I need, the "Starter" tier is plenty:

![](/images/posts/switching-from-self-hosted-to-pro/inline-01.png)

Ghost Pro Tiers

So $15 a month for a platform that I don't need to keep up to date, whenever they ship new features, I get them automatically *and* backups are handled for me. I can focus on writing, which is the entire reason I went with Ghost to begin with. I then looked in my DO billing portal and saw that the droplet for my site was $12 and I had a random snapshot costing $0.51. I realised that I wasn't backing the droplet up, which would've been an extra $3.60. If I remained on DO, I would've enabled this. My DO based Ghost instance would've started costing me ~$19 + the time I'd have to spend keeping it up to date. Switching to Ghost Pro was an absolute no brainer!

Doing this also prompted me to transfer the billing of another DO droplet I had in my account to the actual site owner. That was a $18 droplet with $3.60 worth of backups, each month. I'd been paying for it for around 5+ years and now felt like the right time to hand it over.

So all in all, I've gone from a ~$40 monthly DO invoice to a $15 Ghost invoice, resulting in a ~$25 a month saving which works out being around £19, or ~£228 over the course of the year.
