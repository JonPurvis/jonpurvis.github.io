---
title: Upgrading to PHP 8.4 with Laravel Forge
slug: upgrading-to-php-8-4-with-laravel-forge
date: 2025-02-02T21:47:00.000Z
updated: 2025-02-09T21:47:11.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGxvYWRpbmd8ZW58MHx8fHwxNzM5MTM3NjExfDA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Mike van den Bos
  profile_url: https://unsplash.com/@mike_van_den_bos?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This week I decided to upgrade the SaaS product I'm helping build from PHP8.3 to PHP8.4.
  I'm not a huge fan of upgrading straight away, but I also didn't want to fall behind and
  given it's been out since November last…
---

This week I decided to upgrade the SaaS product I'm helping build from PHP8.3 to PHP8.4. I'm not a huge fan of upgrading straight away, but I also didn't want to fall behind and given it's been out since November last year, I figured enough time had passed for any major issues to have been spotted and fixed.

First thing I did was made sure I had it running on my machine perfectly with 8.4. Thanks to [Laravel Herd](https://herd.laravel.com/), switching locally to 8.4 was an absolute breeze. Once I was running the right version, I decided to run my test suite to see what I was dealing with and thankfully, it wasn't much. There was 2 issues to deal with, both of them were deprecations though, so I could've left them but I decided to get them sorted.

Firstly, I said goodbye to the `worksome/envy` package. It's a great package to ensure that your .env.example file is up to date with what your codebase references, but that package depends on `thecodingmachine/safe`, which when running on 8.4 spits out an absolute ton of deprecation warnings, such as:

```bash
Deprecation Notice: Safe\gmdate(): Implicitly marking parameter $timestamp as nullable is deprecated,
```
```bash
Deprecation Notice: Safe\mktime(): Implicitly marking parameter $minute as nullable is deprecated, the explicit nullable type must be used instead 
```
```bash
Deprecation Notice: Safe\preg_replace(): Implicitly marking parameter $count as nullable is deprecated, the explicit nullable type must be used instead
```

Imagine that, but a couple of 100 warnings whenever you run anything in terminal for the application, pretty annoying! Getting rid of `worksome/envy` stopped those from showing. It's a useful package and if the deprecations are ever fixed, I'll probably re-install it.

Secondly, the `spatie/laravel-sitemap` package was giving a deprecation warning too:

```bash
{closure:Spatie\Sitemap\SitemapGenerator::__construct():48}(): Implicitly marking parameter $response as nullable is deprecated, the explicit nullable type must be used instead
```

This is a package I *did* need to keep, so I set about getting rid of that warning and submitted the following PR:

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/spatie/laravel-sitemap/pull/564" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Make `$response` param explicitly nullable by JonPurvis · Pull Request #564 · spatie/laravel-sitemap</div>
<div class="bookmark-card-description">Hey 👋 Whilst upgrading my application to PHP8.4, I was getting these deprecation warnings when running my test suite:…</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/a856967f17fbee8a9ab2836c40542a8f66c5b3ee6d516bde17c425dd9eda3f0d/spatie/laravel-sitemap/pull/564" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

[Freek](https://x.com/freekmurze) accepted the PR, merged it and then tagged a new release of the package which I then pulled down and just like that, no more deprecation warnings!

I re-ran my test suite and made sure all my tests were passing, I also manually went through my application just to double check everything was working as intended and then created a Pull Request to merge my couple of changes into the `main` branch.

On the Laravel Forge side, I had to install 8.4 on the server as it only had 8.3 available. Once that's done, I went through all 3 sites on the server (production, demo and staging) and swapped them to use 8.4 and I then deleted 8.3 completely as there was no need for it. Afterwards, I merged my PR and let Forge auto deploy it for me!

Done!

Or so I thought...

After a short time, our uptime monitor OhDear started alerting me for missed scheduled tasks. I totally forgot that I had a few scheduled jobs set up within Forge, that were referencing 8.3 still. I quickly swapped them over to run on 8.4 and OhDear then stopped sending alerts. I figured it would be good for Forge to be a bit stricter here, ideally I should've not been able to delete 8.3 because it had some dependants. That, or, Forge should have notified me when I tried to delete it that it had some dependants. I reached out to [James Brooks](https://x.com/jbrooksuk) at Laravel to ask if it would be possible to add something for this, and he said there's something already in the pipeline for it, which is great as I can definitely see myself doing this again!

> Awesome! Is there an "official" way to suggest a feature?  
>   
> I upgraded PHP the other day to 8.4 and removed 8.3, but I forgot I still had workers running on 8.3 and only realised because OhDear alerted me some time later.  
>   
> Could we perhaps get an alert for stuff like this? 😀
> 
> — Jon Purvis (@JonPurvis\_) [January 30, 2025](https://twitter.com/JonPurvis_/status/1885054337426018724?ref_src=twsrc%5Etfw)

Overall, upgrading to 8.4 from 8.3 was painless and took no time at all. If you're still running anything older than 8.4, get yourself upgraded!
