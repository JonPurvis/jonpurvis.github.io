---
title: Laravel Boost
slug: laravel-boost
date: 2025-08-17T00:24:00.000Z
updated: 2026-06-15T00:25:00.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDd8fHJvY2tldHxlbnwwfHx8fDE3ODE0ODMwOTJ8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: SpaceX
  profile_url: https://unsplash.com/@spacex?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This week, I took Laravel Boost for a spin. Boost is a new package by Laravel that, in their own
  words: "Accelerates AI-assisted development by providing the essential context and structure that
  AI needs to generate…
---

This week, I took [Laravel Boost](https://laravel-news.com/laravel-boost) for a spin. Boost is a new package by Laravel that, in their own words:  
  
*"Accelerates AI-assisted development by providing the essential context and structure that AI needs to generate high-quality, Laravel-specific code using any agent."*

Essentially, the package exposes a new artisan command, `boost:install`, which when run, will create markdown files within your application, to give AI agents more context about working with and on your application.

It comes with 15 tools via an MCP server that can do things such as query your database, read the documentation and run commands via tinker. It can also create guidelines specific to your MCP whether it be Junie, Claude, Copilot and more.

I think boost is such a good idea. I'm using it within Cursor and the only problem I've had so far, is sometimes I have to turn it *back* on, when it was previously on. I think this is an issue with Cursor though, rather than Laravel Boost.
