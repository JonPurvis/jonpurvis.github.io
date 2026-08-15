---
title: Moving off Ghost to Astro and GitHub Pages
slug: moving-off-ghost-to-astro-and-github-pages
date: 2026-07-26T15:00:00.000Z
tags:
  - general
  - development
feature_image: >-
  https://images.unsplash.com/photo-1486673748761-a8d18475c757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Karsten Würth
  profile_url: https://unsplash.com/@karsten_wuerth?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This weekend I moved the blog off Ghost and onto GitHub Pages with Astro. It saves me £13.50 a
  month, gives me full control of the site, and even picks up a few extras Ghost was missing.
---

This weekend I finally moved this site off Ghost.

I've been back on Ghost since the end of 2021, when I decided to give blogging another proper go:

<figure class="bookmark-card">
<a class="bookmark-card-link" href="/back-to-ghost/">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Back to Ghost</div>
<div class="bookmark-card-description">It's almost a new year and for 2022 I fancied creating and trying to post regularly on a blog. The obvious choice of platform was of course, Ghost. I've used Ghost many times before since version 1.0. Ghost was also…</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="/favicon.png" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">Jon Purvis</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDd8fGJsb2dnaW5nfGVufDB8fHx8MTY5MzE4NzU4OHww&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=2000" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

For most of that time I self-hosted it. About four months ago I moved onto Ghost Pro, mainly because the Ghost CLI is, in my opinion, quite poor. Whenever I used it I'd end up spending more time debugging than actually upgrading, and it started to feel like a waste of my time when I could just pay to have it managed for me. That solved the upkeep problem, but it also meant I was paying for a platform I wasn't really making full use of.

Ghost is still a fantastic product, but I was paying for it and not really getting much out of what I was paying for. These days Ghost seems to be pushing harder towards paid content, which isn't something that interests me. If folks get some value out of my posts without paying, then happy days. I never pushed hard for subscribers anyway, so a lot of that membership-focused tooling was wasted on me. What I *do* want is a simple place to write posts, host them somewhere reliable, and have full control when I need it.

So I rebuilt the site as a static [Astro](https://astro.build/) project and deployed it on [GitHub Pages](https://pages.github.com/). I'd never used Astro before, but it turned out to be a really strong fit for what I need: Markdown content, a clean build pipeline, and just enough structure without dragging a full CMS around with me. Now when I want to publish, I just commit to `main` and GitHub Actions deploys it automatically. No droplet, no Ghost CLI, no waiting on a managed panel.

The money side is straightforward too. This change saves me **£13.50 a month**, and I get a site I actually own end to end. At the end of the day, blogging is just a bit of a hobby for me, so if I can do it for free, that's a win-win.

Along the way I was able to keep the bits I liked from Ghost and add a couple of extras. Search still works the same way: it covers posts, tags, and pages. One thing the Ghost site never had was a dark / light mode toggle, and the Astro version does. Small quality-of-life win, but I notice it every time I open the site in the evening.

I loved the Ghost design and wanted to replicate that in Astro as best as possible, so hopefully that comes across. Cursor helped a lot with getting the look close to the Source theme I was using on Ghost, so it still feels familiar when you land on the homepage.

Astro's page auditing tool has been brilliant as well. You can see it at the bottom of each page in development, and it flagged a bunch of warnings about images that should be lazy loaded. That made it easy to tidy those up properly rather than guessing. Site speed feels very good too. There were a few slow periods on Ghost, but so far Astro has felt very snappy.

The DNS switchover was smoother than I expected. It took around **two hours**, and once everything was resolving correctly I cancelled the Ghost subscription. One less monthly outgoing, and one more thing I can tweak whenever I want without waiting on a platform update cycle.

Overall, I'm really happy with how it turned out. I've still got a bit of a list of additions I want to make to the site, but Ghost served me well for a long time and this feels like the right next step for how I actually use the blog.
