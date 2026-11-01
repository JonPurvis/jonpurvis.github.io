---
title: Faker Stripe v5.5.0 and Squeaky v3.1.0
slug: faker-stripe-v5-5-0-and-squeaky-v3-1-0
date: 2026-10-25T14:00:00.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Tim van der Kuip
  profile_url: https://unsplash.com/@timberf?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/photos/4_en-Jzhih0?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I tagged Faker Stripe v5.5.0 on 20 October and Squeaky v3.1.0 on the 23rd: Stripe 3D Secure
  authentication IDs, new profanity locales, a German config fix, and the usual housekeeping.
---

<!-- Never use the — character (em dash). Prefer commas, colons, or a normal hyphen (-). -->

I went on a bit of an open source drive last week and tagged new versions of a couple of packages I maintain.

**[Faker Stripe v5.5.0](https://github.com/JonPurvis/faker-stripe/releases/tag/v5.5.0)** went out on **20 October**. **[Squeaky v3.1.0](https://github.com/JonPurvis/squeaky/releases/tag/v3.1.0)** followed on **23 October**. Here is what is worth upgrading for in each.

## Faker Stripe v5.5.0

If you use [Faker Stripe](https://github.com/JonPurvis/faker-stripe) in tests or seeders, this release is mostly about staying aligned with Stripe’s object IDs.

The headline addition is **`stripeThreeDSecureAuthenticationId()`**, for Standalone 3D Secure Authentication objects (`three_d_secure.authentication`). Stripe prefixes those IDs with `tdsa_`; the faker follows the same shape and length as the real examples in their docs, and there is a Pest test locking that in.

The rest of the tag is housekeeping: README banner tweaks and skeleton updates so the repo matches how I am structuring newer packages. No breaking changes from v5.4.0.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/JonPurvis/faker-stripe/releases/tag/v5.5.0" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Release v5.5.0 · JonPurvis/faker-stripe</div>
<div class="bookmark-card-description">Standalone 3D Secure authentication IDs (`tdsa_`), README and skeleton updates.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/JonPurvis/faker-stripe/releases/tag/v5.5.0" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

## Squeaky v3.1.0

[Squeaky](https://github.com/JonPurvis/squeaky) is my Laravel validation rule for catching profanity, built on top of the word lists from Pest’s profanity plugin. This release is about locales and one bug that had been nagging me.

**French and Chinese** are in: configs for `fr`, `zh_CN`, and `zh_TW` are merged from pest-plugin-profanity, and the `Locale` enum plus README now list all **13** supported locales. If you validate user-facing content in those languages, you no longer need to wire lists yourself.

**German** had been loading the wrong merged config; that is fixed in v3.1.0. If DE felt off compared with other locales, this is the release to pick up.

Dependabot bumped a couple of GitHub Actions versions, and the same skeleton refresh landed here as on Faker Stripe.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/JonPurvis/squeaky/releases/tag/v3.1.0" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Release v3.1.0 · JonPurvis/squeaky</div>
<div class="bookmark-card-description">French and Chinese profanity locales, German config merge fix, CI and skeleton updates.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/JonPurvis/squeaky/releases/tag/v3.1.0" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

## Upgrading

Both releases are semver-safe bumps from their previous tags on Packagist. Run your usual `composer update` for `jonpurvis/faker-stripe` and `jonpurvis/squeaky` when you are ready.
