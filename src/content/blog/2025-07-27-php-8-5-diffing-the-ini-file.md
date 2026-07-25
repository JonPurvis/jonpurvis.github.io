---
title: 'PHP 8.5: Diffing the ini file'
slug: php-8-5-diffing-the-ini-file
date: 2025-07-27T21:06:00.000Z
updated: 2026-06-14T21:06:51.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1719085202242-1daca0f5adcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fHNwb3QlMjB0aGUlMjBkaWZmZXJlbmNlfGVufDB8fHx8MTc4MTQ3MTE4NHww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Buddha Elemental 3D
  profile_url: https://unsplash.com/@buddhaelemental3d?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This is a follow up post to the first in this mini series where I explore some of my
  favourite features in the upcoming PHP 8.5, coming in November. The first post explored
  the Pipe operator: This post is all about a…
---

This is a follow up post to the first in this mini series where I explore some of my favourite features in the upcoming PHP 8.5, coming in November. The first post explored the Pipe operator:

<figure class="bookmark-card">
<a class="bookmark-card-link" href="/php-8-5-pipe-operator/">
<div class="bookmark-card-content">
<div class="bookmark-card-title">PHP 8.5: Pipe Operator</div>
<div class="bookmark-card-description">PHP 8.5 is fast approaching. I wanted to look at some of the features I'm most excited about. One of which is, the pipe operator. This makes it easier for developers who need to</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="/favicon.png" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">Jon Purvis</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://images.unsplash.com/photo-1543674892-7d64d45df18b?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fHBpcGVzfGVufDB8fHx8MTc4MTQ3MDgzM3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=2000" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

This post is all about a new flag being added to `php ini` ,the `--diff` flag .

This flag will allow you to see what has been changed, when compared with the default set of values. It's not often I need to go into a `php.ini` file, but there have been times where I've often wanted to see a history of a certain value. As of PHP 8.5, developers can run `php ini --diff` to see what is different. The output will look something like:

```
$ php --ini=diff

Non-default INI settings:
allow_url_include: "0" -> ""
display_errors: "1" -> ""
```

This is definitely a nice QoL improvement!
