---
title: Filament v4 is now Stable
slug: filament-v4-is-now-stable
date: 2025-09-07T00:34:00.000Z
updated: 2026-06-15T00:34:43.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1541185934-01b600ea069c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDMwfHxyb2NrZXR8ZW58MHx8fHwxNzgxNDgzMDkyfDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: SpaceX
  profile_url: https://unsplash.com/@spacex?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  It's a happy day for Laravel and Filament fans because Filament v4 is now stable. I took
  some time to have a look at the next major version of Filament and what it introduces and
  comment on some of my favourite things.…
---

It's a happy day for Laravel and Filament fans because Filament v4 is now stable. I took some time to have a look at the next major version of Filament and what it introduces and comment on some of my favourite things.

For a full write-up, the Filament team created this fantastic article:

Filament

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://filamentphp.com/insights/leandrocfe-whats-new-in-filament-v4" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">What’s new in Filament v4? - Feature Overview - Filament</div>
<div class="bookmark-card-description">## Introduction **Filament v4** is here with a range of powerful, helpful updates. It’s faster, easier to use, and gives you more control when building applica…</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://storage.ghost.io/c/43/cb/43cb054d-e069-4e35-94fc-3ca586640327/content/images/icon/apple-touch-icon-c1c03c3e-d833-469a-b552-9c0987714886.png" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">filamentphp.com</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://storage.ghost.io/c/43/cb/43cb054d-e069-4e35-94fc-3ca586640327/content/images/thumbnail/leandrocfe-whats-new-in-filament-v4-53a53fa4-0bd0-44e7-b91c-b4d987dd1bf6.png" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

One of my favourite additions has to be the addition of MFA (Multi-Factor Authentication). In today's world, security **must** be a priority when building applications and it's good to see the Filament team making it easier than ever before to secure your apps with MFA. Their implementation comes with both App level and email level authentication. You can even add custom MFA providers if needed!

Filament V4 comes with various performance improvements. Personally I've never had any issues with the performance you get out of Filament, but the team has been focusing on the number of files that get loaded along with the size of the files that still get loaded, which results in less HTML and thus, faster page loads.

Forms have received some love and we now have access to a shiny new rich editor, powered by TipTap. We also get a new slider component, code editor component and custom blocks.

* * *

I'm really looking forward to trying out the other features that Filament v4 brings!
