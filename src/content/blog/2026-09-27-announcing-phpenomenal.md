---
title: Announcing PHPenomenal
slug: announcing-phpenomenal
date: 2026-09-27T16:00:00.000Z
tags:
  - development
  - general
feature_image: >-
  https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000
feature_image_credit:
  name: Louis Reed
  profile_url: https://unsplash.com/@_louisreed?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Damien Seguy and I are running PHPenomenal: build something useful with the
  new PHP 8.6 features before the release on 19 November 2026.
---

<!-- Never use the — character (em dash). Prefer commas, colons, or a normal hyphen (-). -->

I spent part of the week building a test application, so I could finally try the new features in PHP 8.6. Partial function application was the standout. `clamp()` is a genuinely useful addition too.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://x.com/JonPurvis_/status/2102155869873938506" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Trying the new PHP 8.6 features</div>
<div class="bookmark-card-description">Part of the week spent on a test application, to see what partial function application and clamp() actually feel like.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://x.com/favicon.ico" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">x.com</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://pbs.twimg.com/media/HSxa-sAWUAATFkK.jpg?name=small" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

That post is where this started. [Damien Seguy](https://phpc.social/@dseguy) and I got chatting, and PHPenomenal came out of the conversation. PHP 8.6 lands on 19 November 2026. The changelog is already public: partial function application, `clamp()`, a `Time\Duration` class, `#[\Override]` on constants, writes on objects held in a constant, readonly properties with a default, and a `SortDirection` enum. Reading that list is one thing. Using the features in a program that runs is another. The brief is to build a thing, in PHP 8.6, and show the source.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://www.exakat.io/phpenomenal-8-6-a-challenge-to-for-phps-next-release/" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">PHPenomenal 8.6</div>
<div class="bookmark-card-description">A challenge to write something useful with the features landing in PHP 8.6.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://www.exakat.io/favicon.ico" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">exakat.io</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://www.exakat.io/wp-content/uploads/2026/09/sunrise.320.jpg" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

## Build a thing

The deadline is midnight UTC on 19 November 2026. That is the moment PHP 8.6 officially exists.

There is no tight definition of useful. The application has to run, take some input, and produce some output, on a single machine, in a sensible amount of time. Fizz-buzz counts. A program that echoes its arguments counts. You can pull in Composer, write tests, run static analysis, and go completely overboard. Just keep it on one machine. Nobody needs a downloaded dataset to `clamp()` an integer.

The point is to get the features into an editor before they ship, and to see what other people make of them whilst they are still new.

## The features

Every entry is expected to touch this set:

- Partial function application
- `Time\Duration`
- `clamp()`
- `#[\Override]` on a constant
- Writes on const-held objects
- Readonly property defaults
- `SortDirection`

There is a second list if you want to go further, and it is allowed to grow as people notice more of what 8.6 changed: the polling API, `trim()` stripping form feeds, the new stream error handling, doc comments on function parameters, and `__debugInfo()` on enums. Deprecations do not need inventing. If something is on the way out, just avoid introducing it.

[PHP.Watch](https://php.watch/versions/8.6) has the full changelog if you want it without the contest rules. The rules themselves are in the [repo README](https://github.com/dseguy/phpenomenal).

## How to enter

Open a pull request on the repo. Say what you are building, include a README, and update the PR as the thing takes shape. A second idea can be a second pull request. Looking at what other people have opened, and leaving a comment when something is clever or broken, is part of it.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/dseguy/phpenomenal" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">dseguy/phpenomenal</div>
<div class="bookmark-card-description">Write PHP 8.6 before it arrives.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.com/favicon.ico" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">github.com</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/dseguy/phpenomenal" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

The source has to lint under PHP 8.6. Linting under 8.5 is not required, and for some of these features it will not even parse. Pre-release builds are on [php.net](https://www.php.net/pre-release-builds.php), including Windows binaries. Docker images are available. On a Mac, [shivammathur/homebrew-php](https://github.com/shivammathur/homebrew-php) is the straightforward route.

The repo includes `scripts/check-php86-features.php`. It is not a string search. It tokenises the file with `PhpToken::tokenize()`, so a feature name sitting in a comment or a string does not count as used. Point it at your file and it reports what it found, where, and what is still missing.

Damien and I are both on the repo, and on the [PHP Community Discord](https://discord.phpc.chat/).

There is an example in the repo already: [Stampede](https://github.com/dseguy/phpenomenal/pull/4), a short terminal horse race whose runners are named after the new features, and whose code actually uses them. I'm on the board, so it doesn't count.

## Every release

Damien and I would like this to become a regular thing: a PHPenomenal for each PHP release. Same shape each time. Here are the features that are about to land. Show us a thing that actually uses them, before release day, whilst there is still no settled way to write them. If 8.6 goes well, the one after gets a contest too.

Midnight UTC on 19 November 2026. The repo is [github.com/dseguy/phpenomenal](https://github.com/dseguy/phpenomenal). Open a pull request.
