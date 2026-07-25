---
title: My First Time with Livewire
slug: my-first-time-with-laravel-livewire
date: 2024-03-16T10:52:00.000Z
updated: 2026-03-29T15:13:28.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fHdpcmVzfGVufDB8fHx8MTc3NDc5NzIwNHww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Scott Rodgerson
  profile_url: https://unsplash.com/@scottrodgerson?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I've been looking into Livewire for quite some time now, but never really had a need to use it and
  the way I learn best is by working on a project that I can actually "launch" at the end of it.
  Well recently at work, I…
---

I've been looking into [Livewire](https://livewire.laravel.com/) for quite some time now, but never really had a need to use it and the way I learn best is by working on a project that I can actually "launch" at the end of it.

Well recently at work, I decided to build an internal status page for all of our internal tools and systems so that folks could visit it and find out what's going on with any of them (we have a lot).

This was a simple application and there isn't much to it, which is why I thought it was the ideal candidate for *finally* trying out Livewire. It's worth noting that I've also used [Vue](https://vuejs.org/) years ago but didn't really get on with it, I think it's because it's Javascript and I come from more of a PHP background, which is why I fell in love with Livewire from the get go.

As soon as I installed Livewire into my application and built a simple component, then had it render in my view, I was hooked. It is super intuitive and it **just makes sense**. The best bit? It's pure PHP 😍

This is a status page, so of course it would be good if you were viewing it, a status update came in and the results just updated instantly whilst you viewed the page, Livewire makes this so easy by just adding `wire:poll` to the div of the component that contains the results.

I like how Livewire handles pagination too, if you use the Pagination trait within your Component, then you end up with pagination that doesn't reload the entire application every time you change the page, however it still updates a query param in the URL if you wanted to share the specific page with someone, for example.

I love how Livewire handles query parameters, you can search for results live, without needing to reload the application and Livewire handles updating the URL for you. It's magic!

The status page application was really simple so I only scratched the surface with what Livewire is capable of. This was really my first delve into using the TALL stack:

*   **T**ailwind
*   **A**lpine
*   **L**ivewire
*   **L**aravel

and I think it'll be the stack I use going forward. I found it incredibly easy to get an application started and finished in no time at all and I'm so glad I finally bit the bullet and tried Livewire!
