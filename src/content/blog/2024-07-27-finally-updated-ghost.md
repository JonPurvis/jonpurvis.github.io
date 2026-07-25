---
title: I Finally Updated Ghost
slug: finally-updated-ghost
date: 2024-07-27T20:54:47.000Z
updated: 2026-03-29T15:20:26.000Z
tags:
  - general
feature_image: >-
  https://images.unsplash.com/photo-1604334261172-6fdae8d5c29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDYxfHxnaG9zdHxlbnwwfHx8fDE3MjIxMTIxMTB8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Pavel Neznanov
  profile_url: https://unsplash.com/@npi?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Well, I finally took the time to update the version of Ghost that this blog uses, mainly because I
  wanted to start using the Internal Linking tool that was added sometime last month, which makes it
  much easier to link…
---

Well, I finally took the time to update the version of Ghost that this blog uses, mainly because I wanted to start using the Internal Linking tool that was added sometime last month, which makes it much easier to link to other posts. You simply type @ in your editor and then that opens up a list of your posts.

I also wanted to use the latest editor for several reasons, the main one being that when I embed a Tweet, it renders without me having to change the URL from *x.com* to *twitter.com*, because the version of Ghost I was using was pre Twitter being called X but because Twitter embeds contain the *x.com* domain, Ghost wouldn't allow it so I'd have to always change the URL.

I'm a big fan of using Emoji in my posts and previously I'd use the native MacOS Emoji menu which meant having to press Control + Command + Space to bring up the menu, now I just need to type : followed by a name of an Emoji and it brings up a menu.

I also wanted to make use of the Ghost Bookmarker tool which is a Google Chrome extension that allows you to save a link directly in your Ghost admin. For example, if I'm stumbling around the web and come across a new package that I fancy sharing, I can use the tool to save a link to my Ghost Admin as a draft post, which I can then add to later on.

Other additions that I can now benefit from include a more clean settings interface, post history and post reminders.

Getting a bit more technical, I was previously running [Ghost 5.60](https://github.com/TryGhost/Ghost/releases/tag/v5.60.0), which released in August 2023. This site uses a self hosted version of Ghost via Digital Ocean, so it's up to me to keep it up to date. Turns out I hadn't done a great job 😄

It took more effort than I would've liked to get it updated as I ran into problems such as:

*   Node was out of date
*   The Ghost CLI was out of date
*   The directory for the Ghost Manager had the wrong permissions
*   Various things within `node_modules` had the wrong permission
*   The Ghost CLI was restarting Ghost but not recognising the restart had happened, so it kept spinning

Unfortunately I've always found the Ghost CLI a bit clunky. I don't think I've ever used it to update Ghost and had it work first time, which is a shame because the rest of the platform is perfect.

Note to self, don't leave it almost a year before updating ghost again! 👻
