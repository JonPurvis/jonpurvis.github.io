---
title: I'm now maintaining Elephpant.me
slug: im-now-maintaining-elephpant-me
date: 2026-03-08T19:03:00.000Z
updated: 2026-04-06T18:03:41.000Z
tags:
  - development
  - elephpants
feature_image: >-
  https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDMyfHx0ZWNofGVufDB8fHx8MTc3NTQ5ODYwOXww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Shubham Dhage
  profile_url: https://unsplash.com/@theshubhamdhage?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Over the last couple of years, I've been using and contributing to which is a website for
  collectors of PHP Elephpants to manage their collections and find new trade partners.
  After over a year of inactivity on the…
---

Over the last couple of years, I've been using and contributing to [https://elephpant.me/](https://elephpant.me/) which is a website for collectors of PHP Elephpants to manage their collections and find new trade partners.

After over a year of inactivity on the repository as a whole, I reached out to the current maintainer and offered some assistance, which he accepted and added me to the project!

I didn't want to see the project reach end of life so I'll be working with [Thomas Eiling](https://x.com/teiling88) to revitalise the project and update it. Pretty soon after I got to work on a totally new redesign that brings the site up to modern standard, including:

*   PHP 8.5 instead of 7.4
*   Laravel 12 instead of Laravel 7
*   Tailwind CSS + Flux UI instead of Bootstrap
*   Livewire 4

The design of the site wasn't bad, so I focused on just freshening it up a bit:

![](/images/posts/im-now-maintaining-elephpant-me/inline-01.png)

![](/images/posts/im-now-maintaining-elephpant-me/inline-02.png)

![](/images/posts/im-now-maintaining-elephpant-me/inline-03.png)

![](/images/posts/im-now-maintaining-elephpant-me/inline-04.png)

I decided the match the purple so it's closer to that used on the website for the [PHP Foundation](https://thephp.foundation/).

If you want to take a look over the code, you can do so here:

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/jgrossi/elephpant.me/pull/256" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Modernise the Codebase by JonPurvis · Pull Request #256 · jgrossi/elephpant.me</div>
<div class="bookmark-card-description">Overview Firstly, thanks to @jgrossi for inviting me to be a maintainer on this project! I think the first port of call is to update the tech stack to a more modern stack and give…</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/jgrossi/elephpant.me/pull/256" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

There's a few things that need to happen before this PR can be merged, including moving the site over to a more modern server that will support PHP 8.5. Whilst that happens, I'll continue to keep this branch up to date with changes that get added to `master`. I also want to update it to Laravel 13 and Vite 8 when they release.
