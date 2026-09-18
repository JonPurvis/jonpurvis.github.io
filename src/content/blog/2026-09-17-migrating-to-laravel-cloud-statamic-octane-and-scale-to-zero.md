---
title: Migrating to Laravel Cloud
slug: migrating-to-laravel-cloud-statamic-octane-and-scale-to-zero
date: 2026-09-17T20:00:00.000Z
tags:
  - development
  - general
feature_image: >-
  https://images.unsplash.com/photo-1752563489048-91a00aafd97e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000
feature_image_credit:
  name: Bulat Akhtiamov
  profile_url: https://unsplash.com/@richard_29?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/photos/mnBMe5L4RWM?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  The WordPress rebuild is live on Laravel Cloud. Statamic, Octane, object storage, scale to zero,
  hourly usage visibility, and a fraction of what the old droplet cost.
---

<!-- Never use the — character (em dash). Prefer commas, colons, or a normal hyphen (-). -->

Just over a week ago I wrote about a photographer's WordPress site getting defaced and rebuilding it with [Statamic](https://statamic.com/) on [Laravel Cloud](https://laravel.com/cloud). Well, it's live now, and the whole thing took a couple of hours rather than a weekend. The setup process was even smoother than I'd expected.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="/goodbye-wordpress-and-digitalocean/">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Goodbye WordPress and DigitalOcean</div>
<div class="bookmark-card-description">A photographer WordPress site I built years ago got defaced by z_one. DigitalOcean backups were useless, then the files turned out to still be there, so I rebuilt it with Statamic.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="/favicon.png" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">Jon Purvis</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://images.unsplash.com/photo-1562813733-b31f71025d54?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;q=80&amp;w=2000" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

The rebuild is Statamic 6 on Laravel 13 (PHP 8.5): Antlers templates, Tailwind v4, Alpine.js, and Statamic's eloquent driver so content lives in MySQL. Server-rendered pages, no Inertia or Livewire, which suits a gallery site fine. I'd originally planned to wire up Laravel Scout for search, but Statamic's built-in local index was simpler for this site. After deploy you run `php please search:update --all`, and the app rebuilds a missing index on its own if it needs to.

Laravel Cloud was the obvious host. I didn't want another box to patch, another SSH session wondering whether `apt upgrade` had broken PHP, or another WordPress install to keep on top of. Push to git, it deploys. That was basically it.

## Moving the data

With the old files recovered, migration was mostly about getting everything into the new shape.

I wrote a custom Artisan command to read the WordPress database and populate Statamic entries, categories, and tags. That was the fiddly bit. Once the entries existed, attaching the media was straightforward.

For assets, I attached Laravel Cloud's Object Storage to the app as the `public` disk and uploaded the existing media through Cloud's File Explorer. Drag, drop, done. No custom S3 scripts, no rsync over SSH. Uploading a few hundred photos through the browser was simple enough, and I love how easy File Explorer makes navigating through and managing files. That's up there with scale to zero as one of my favourite things about Cloud.

When you enable things that need environment credential changes, like Object Storage, Cloud auto-injects them for you. Statamic's Glide image manipulations just worked against the remote disk once the files were there.

I also used the migration as a chance to tidy up data from years of the site being live. WordPress had accumulated around 300 empty tags, so those didn't make it across. I used AI to draft descriptions for categories and tags that never had them, and to fill in missing alt text where the photographer hadn't written anything.

I kept legacy URL redirects too, so old bookmarks still work. Old `/photos/{slug}` paths redirect to the new dated URLs (`/2015/01/27/tyne-bridge` style). That matters when a site has been live for years.

The front-end got a proper refresh as well: dark / light / system theme, a much cleaner gallery, and it holds up well against Lighthouse.

## Setting up Cloud

Creating an organisation, connecting GitHub, and standing up a first environment took minutes. Pick a repo, pick a branch, deploy. Subsequent pushes build and go live without me touching a server. I spent more time clicking around the Cloud UI out of curiosity than I did on anything that felt like server admin, which is exactly what I wanted after the WordPress incident.

Most of the Statamic-on-Cloud setup was routine: attach Object Storage with disk name `public`, run migrations after deploy, create the single control-panel user Statamic Core allows, warm the search index, clear Glide's cache.

The one real gotcha was control panel thumbnails. Statamic's default admin previews use `/cp/thumbnails/...`, which often fails when assets live on object storage, even though public `/img/` Glide URLs work perfectly on the site itself. On the front-end, images loaded fine. In the control panel, asset previews were broken or missing. I'd browse entries, see empty thumbnail boxes, and wonder if the migration had gone wrong, until I clicked through and realised the assets were fine and it was only the CP preview route that was unhappy.

I ended up with a small app-level fix so CP previews use the same public Glide pipeline as the front-end. Took longer to diagnose than to fix, but it's the sort of thing you'd never hit on local disk and only notice once media is on S3-compatible storage in production. If you're moving Statamic to Cloud with object storage, keep an eye on that.

Everything else was dialling in Statamic details. A couple of hours all in.

The one UI thing I wanted was dark mode. There doesn't seem to be a toggle yet. Forge has had it for years, so I'm hoping Cloud isn't far behind.

## Push to deploy and quality gates

On WordPress + DigitalOcean there wasn't really a deploy process. Updates were manual, which I was never a fan of.

Now I work on it locally with Herd, push to git, and Cloud deploys. Dependabot opens weekly grouped pull requests for Composer, npm, and GitHub Actions. GitHub Actions runs a full quality gate on every PR: Rector, Pint, Larastan (PHPStan level 10), then Pest with 100% type coverage and a 75% line-coverage floor on `app/`. Locally it's `composer gate:fast` before I commit and `composer gate:full` before I merge.

That might sound like overkill for a portfolio site, but it's exactly why I'm comfortable letting agents work on the codebase too. They can run the same gates and verify their own work before anything goes live. On a WordPress site, "run the test suite" isn't really a thing.

## Octane and FrankenPHP

The site feels faster than the old WordPress install. Cleaner PHP, no admin bar on the front end, no plugin overhead on every page view.

I also pulled in Laravel Octane with FrankenPHP. On Cloud that's literally a toggle in the compute cluster settings once `laravel/octane` is in your `composer.json`. Octane keeps the Laravel application booted in memory between requests instead of starting fresh every time.

That matters more than I expected on this site. A gallery page doesn't just render HTML. It fires dozens of separate requests to `/img/` for Glide image manipulations. On normal PHP-FPM, each of those pays a full framework boot. Octane removes that cost on warm workers.

Locally on Herd, the difference was obvious:

| Request | PHP-FPM | Octane (FrankenPHP) |
| --- | --- | --- |
| Homepage | ~350ms | ~115ms |
| Individual `/img/` request | ~170ms | ~7ms |

Your mileage will vary in production, but the direction was clear enough that I kept it on.

Octane on Statamic isn't quite "toggle and forget." Long-lived workers expose singleton and request-state quirks you never notice on PHP-FPM. I had to handle a few of those before I was ready for production. Once they're in place, though, the gain is real, especially for image-heavy Statamic sites.

## Cost

The old DigitalOcean droplet was costing around $28 a month, running 24/7 whether anyone visited or not.

On Laravel Cloud's Starter plan, I pay for what I use: $5 per month plus usage, with $5 in monthly usage credits included. After a few days live, my usage was well under a dollar, a fraction of the old droplet. I set a spending alert in Cloud just in case it ever approached that old $28 mark. I don't expect it to get anywhere near it.

Cloud also makes it really easy to see where you're at. There's a usage dashboard that updates hourly, showing your current spend, how close you are to triggering your spending alert, bandwidth usage against your allowance, and how much of your credits you've used so far. On a droplet you mostly just paid the bill at the end of the month and hoped for the best. Here you can actually see what's going on as the month progresses.

You can drill down further too. There's a breakdown of resources like databases, cache, buckets, and websockets, which makes it much easier to work out where the cost is coming from. If you've got multiple applications on Cloud, that same page gives you a per-project breakdown as well. For a single quiet site like this one it's mostly reassuring rather than essential, but if you're running a few things on the same organisation it's actually useful.

Your total invoice depends on the plan fee and how much of the included credits you burn through. I'm quoting my usage, not promising your bill will match mine. For a quiet portfolio site, the numbers are pretty hard to argue with compared with an always-on VPS.

## Scale to zero

This is a photographer's portfolio, not a SaaS dashboard. Traffic is bursty at best: a few visits when someone shares a link, then silence for days.

Laravel Cloud's [Scale to Zero](https://laravel.com/blog/your-laravel-cloud-stack-now-scales-to-zero) on Flex compute lets the environment sleep after a period of inactivity and wake when the next request arrives, typically in under 500ms on the newer Flex sizes. Not literally instant, but fast enough that visitors won't notice. Database clusters can sleep too when there are no active connections.

You're not paying for compute while everything is asleep. That's the appeal for a site like this. The old droplet was on 24/7 for a site that might get a handful of visits on a good week. Scale to zero flips that around: you pay when someone actually shows up, rather than keeping a server warm just in case.

If you've got a side project or client site on a £20 VPS that's mostly quiet, this is the feature I'd point you at first. A spending alert gives you a safety net if traffic ever spikes.

A few things to keep in mind: object storage and bandwidth still cost money while the app sleeps. Pro compute does not scale to zero. It's for workloads that need to stay warm. The first request after sleep pays a small wake-up cost. Scheduled tasks wake a sleeping Laravel app when they need to, so you're not silently breaking cron just because the site naps. You can also configure Cloud to wake the environment periodically on its own to run scheduled tasks. I'm not using that for this site, but it's worth knowing about if you've got jobs that need to fire on a schedule regardless of traffic.

For a site like this, I'm happy with that trade-off.

One other thing worth mentioning: support.

I had an issue where the database cluster was failing to wake up, so I temporarily disabled scale to zero and put a support ticket in. Within an hour I had a reply to let me know the Cloud infra team were already looking into it, and not long after that another message to say it should be resolved. You cannot fault that. A reply within an hour, especially at midnight, is fantastic.

Overall I'm really happy with how it turned out. The photographer gets a cleaner admin and a faster public site. I get git-based deploys, automated dependency PRs, and no droplet to patch. I've already got at least two other projects lined up as Cloud candidates, and I'll definitely be moving those over in the coming weeks.

If you're maintaining a small Laravel or Statamic site on a legacy VPS mostly because it has always been there, especially if your traffic graph has a lot of flat lines, give Laravel Cloud a proper look. The Starter plan is $5 a month plus usage with $5 in monthly usage credits included, so you can stand up a real environment without committing to an always-on droplet. Push-to-deploy from GitHub, File Explorer, scale to zero, and Octane as a toggle made this migration feel almost boring in the best way. If you've been putting off moving a quiet Laravel site off a VPS, the included credits make it easy to try without much commitment.

<aside class="callout callout-info">
<strong>Heads Up!</strong>
<p>After <a href="https://x.com/JonPurvis_/status/2099619737248387494">the tweet</a> I made about this migration, Laravel got in touch and asked if I'd be up for writing a post on my site about it in exchange for some Cloud credits, which I accepted. Everything you read here is my own thoughts.</p>
</aside>
