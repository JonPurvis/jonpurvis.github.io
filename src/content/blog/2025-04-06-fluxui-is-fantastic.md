---
title: FluxUI is fantastic
slug: fluxui-is-fantastic
date: 2025-04-06T20:59:00.000Z
updated: 2025-07-20T20:59:44.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1555664424-778a1e5e1b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGNvbXBvbmVudHxlbnwwfHx8fDE3NTMwNDUxNzd8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Robin Glauser
  profile_url: https://unsplash.com/@nahakiole?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I'm currently working on a SaaS and early on in the development I decided to use the TALL stack.
  It's the stack I'm most comfortable with and I can do things quickly in. That said, I still suck
  at building things…
---

I'm currently working on a SaaS and early on in the development I decided to use the TALL stack. It's the stack I'm most comfortable with and I can do things quickly in. That said, I still suck at building things consistently, e.g. buttons and text sizes. Admittedly, my front-end work often looks like it's been built by a team of people with *slightly* different opinions.

This is where FluxUI helps. I'd heard of it for a while but never really explored it. One day I decided to install it using composer and swap the interface I'd built to use FluxUI instead. This meant I could have things like consistent font sizes and colours, consistent buttons and more, with no real effort. It was a lot of work to change over what we already had to use FluxUI, but it was *so* worth it. At the end of the work, I was left with a few bits that I needed the Pro license for. I reached out to the founders of the SaaS I'm working on and put forward a short business case about why this is a worthwhile purchase and within about 15 minutes I had the pro license purchased. I was then able to port things like Charts over to Flux instead of using ChartJS. This work allowed me to reduce the codebase significantly!

Yes I bought the Pro license, but it's worth noting that a lot of projects could get away with using the free version of FluxUI because it comes with so much stuff out of the box. We needed Tables, Charts, Calendars and Date Pickers though so Pro was really the only option. My thought was we either use FluxUI for everything, or we don't use it at all.

Aside from a lovely set of components, I was able to change a lot of the structure of the application so the responsiveness is *so so so* much nicer. Previously it was a bit unwieldy in the code and I really didn't like it. With FluxUI, it looks clean and works like a dream.

There's a few components that I'd like to see down the line such as additional chart types. Right now, you can do Line and Area but I'd like to see support for Pie. I'd also like to see a lightbox component so you can pass in an image URL and it would show it in a lightbox. This could technically use the existing modal functionality and I could built it in my own app, but I think it would be good as a native feature.
