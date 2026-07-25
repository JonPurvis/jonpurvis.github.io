---
title: Monitoring Using Oh Dear
slug: monitoring-using-oh-dear
date: 2024-09-22T13:53:00.000Z
updated: 2024-10-05T13:53:29.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fHNlcnZlcnN8ZW58MHx8fHwxNzI4MTM2MzcyfDA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Taylor Vick
  profile_url: https://unsplash.com/@tvick?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I've mentioned a few times on this blog that I'm currently helping out a SaaS product get off the
  ground and one of the things I wanted to make sure was done right, was monitoring. It's all very
  well thinking your…
---

I've mentioned a few times on this blog that I'm currently helping out a SaaS product get off the ground and one of the things I wanted to make sure was done right, was monitoring. It's all very well *thinking* your product is working, but unless you have a decent and robust monitoring solution, you can never be 100% sure it's actually working.

There are a ton of tools out there that can do all different parts of what you should monitor in a web application, but nothing that takes them all and combines them into one service, this means you're paying out more than you should have to, to ensure your application is up and running.

Well, I'll backtrack slightly on that last paragraph, because [Spatie](https://spatie.be/) have their own SaaS called [Oh Dear](https://ohdear.app/) and the purpose of Oh Dear is to have all of your monitoring in one place, under one invoice. Oh Dear can monitor a lot of aspects of web applications but I currently have the following enabled:

*   Uptime
*   Performance
*   SSL Certificate Health
*   Broken Links
*   Mixed Content
*   Google Lighthouse
*   Crons
*   Application Health
*   Sitemap
*   DNS Records

Oh Dear combined with the test suite of the application means I can rest easy knowing that unless there's some crazy edge case, everything is working as it should be.

I've noticed some issues with pings for scheduled tasks not sending to Oh Dear, so I'm debugging that as I'm not sure whether it's the application not sending them or Oh Dear not picking them up properly.

Other than monitoring, you can also set up a Status Page, manage maintenance periods and so much more! The best part is that I get all of this for less than $200 a year. In fact, if you take a look at [the pricing page](https://ohdear.app/pricing), there's a breakdown on the right hand side which splits different services down that you'd have to buy, if you weren't using Oh Dear and their example comes to $127.95 a month!

This isn't an advert for Oh Dear, I just really like the product and wanted to make more folks aware that it existed!
