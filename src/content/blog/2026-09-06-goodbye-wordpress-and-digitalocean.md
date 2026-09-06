---
title: Goodbye WordPress and DigitalOcean
slug: goodbye-wordpress-and-digitalocean
date: 2026-09-06T20:00:00.000Z
tags:
  - development
  - general
feature_image: >-
  https://images.unsplash.com/photo-1562813733-b31f71025d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000
feature_image_credit:
  name: Israel Andrade
  profile_url: https://unsplash.com/@israelandrxde?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  A photographer WordPress site I built years ago got defaced by z_one. DigitalOcean backups were
  useless, then the files turned out to still be there, so I rebuilt it with Statamic.
---

<!-- Never use the — character (em dash). Prefer commas, colons, or a normal hyphen (-). -->

On Friday night I was on a call with my good friend Sam Carré (of [SaloonPHP](https://docs.saloon.dev/) fame) and I got a text from my friend's dad, with a screenshot of his website that I'd built years ago for him on WordPress, as he's a photographer and wanted somewhere to host his photos.

The homepage had been changed to "This site has been hacked by z_one".

Uh oh!

I'd never heard of z_one before, but they'd managed to get into the DigitalOcean droplet. I figured I could at least get the site back to a somewhat usable state while I worked out what to do next. That plan fell apart quickly. Every DigitalOcean backup had been taken *after* the attack, so there was nothing clean to restore from.

I happened to mention it on the call, and Sam brought up [Statamic](https://statamic.com/). I'd heard of it, but never had a proper reason to try it. This suddenly felt like the perfect excuse to leave WordPress behind, and DigitalOcean with it. A Statamic site hosted on [Laravel Cloud](https://cloud.laravel.com/), probably for a lot less money, sounded like a win-win.

There was one rather large issue though. With no usable backups, it looked like years of uploads were gone. Posts gone. Tags gone. Everything gone.

Or so I thought.

I reset the root password on the infiltrated server, logged in, and was able to pull out everything I needed. The hacker hadn't actually destroyed anything. They'd just dropped a page over the top of the WordPress site.

That changed the mood completely. This was the perfect chance to rebuild the site with modern technology. I got to work on a shiny new site with Laravel and Statamic, put search together with [Laravel Scout](https://laravel.com/docs/scout), and set it up to host on [Laravel Cloud](https://cloud.laravel.com/).

Because I had all the old content back, I could migrate properly rather than starting from an empty shell. With the help of AI I ran a job that populated descriptions for all the tags and categories, and also analysed the images to fill in missing descriptions. Along the way I cleared out around 300 empty tags that had built up over the years. The WordPress URL structure has been kept as well, so existing bookmarks keep working.

The front-end got a proper refresh too. It feels much more modern, it's faster, and it holds up well against Google Lighthouse. I also added a dark / light / system mode switcher, which is one of those small things you notice immediately once it's there.

The day-to-day workflow is nicer as well. I can work on it locally, test changes properly, then push to git and have it auto-deploy to Laravel Cloud. It's got a proper CI / CD pipeline with quality gates, which is especially handy when agents work on the site: they can verify their own work before anything goes live. Security updates should be *so* much easier than babysitting a WordPress install on a droplet.

I'm still finding my way with Statamic, but overall it does seem really cool. Considering how bloated WordPress is, I'm genuinely thankful to Sam for suggesting it. The admin panel is super clean. I've turned a few things off to cut down the noise, and it all translates nicely to the front-end.
