---
title: SaloonPHP now has a Leaky Bucket
slug: saloonphp-now-has-a-leaky-bucket
date: 2025-12-21T19:32:00.000Z
updated: 2026-04-11T18:32:47.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1589630388147-68b3a2172e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGJ1Y2tldHxlbnwwfHx8fDE3NzU5MzIzNTd8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Lucas van Oort
  profile_url: https://unsplash.com/@switch_dtp_fotografie?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  One of the many things I've been working on lately is adding Leaky Bucket to the . This
  request actually came in via a Github issue, but (maybe selfishly) I actually saw a use
  case for one of my own applications, so I…
---

One of the many things I've been working on lately is adding Leaky Bucket to the [SaloonPHP Rate Limit Plugin](https://github.com/saloonphp/rate-limit-plugin). This request actually came in via a Github issue, but (maybe selfishly) I actually saw a use case for one of my own applications, so I set to work implementing it!

Firstly, if you haven't read the docs for it, here's a link to that:

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://docs.saloon.dev/installable-plugins/handling-rate-limits#leaky-bucket-limiter" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Rate Limit Handler | Saloon</div>

<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://docs.saloon.dev/favicon.ico" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">docs.saloon.dev</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://docs.saloon.dev/social-card.png" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

So what is a leaky bucket? It's *another* way to handle rate limits set by APIs. Essentially using a leaky bucket means that while you are making requests, within a given time frame (usually every second) you "gain" additional requests you can make. For example if an API integration allowed 60 requests per minute but had a leak rate of 1 per second, you could in theory be constantly communicating with the API as long as you stay within the 60 request limit.

So how do you use it? Well, I want to keep it as easy to use as the existing rate limit behaviour, if you're specifying rate limits already, within your `resolveLimits` method, you can do:

```php
protected function resolveLimits(): array
{
    return [
        Bucket::capacity(60)
            ->leak(1)
            ->everySeconds(1)
            ->sleep()
    ];
}
```

`Bucket` extends the existing `Limit` class, so all the existing time intervals you may already be using can be used with a bucket too.

This was fun to work on! I had to do a bit of research as I wasn't actually too familiar with leaky buckets but once I understood, I realised that there's at least one application I maintain where this could definitely come in use!

If you want to take a look at the implementation PR, I'll drop a link below!

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/saloonphp/rate-limit-plugin/pull/26" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Add Leaky Bucket Algorithm by JonPurvis · Pull Request #26 · saloonphp/rate-limit-plugin</div>
<div class="bookmark-card-description">Fixes: #12 (partially) This PR adds Leaky Bucket as another way of Rate Limiting your API Requests. I won&amp;#39;t go too much into detail about exactly what the Leaky Bucket…</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/saloonphp/rate-limit-plugin/pull/26" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

