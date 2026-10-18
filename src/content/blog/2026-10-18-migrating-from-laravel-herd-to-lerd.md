---
title: Migrating from Laravel Herd to Lerd
slug: migrating-from-laravel-herd-to-lerd
date: 2026-10-18T18:00:00.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1685663186894-d5cceae87a4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Zoe Askew
  profile_url: https://unsplash.com/@zoe_askew?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/photos/a-herd-of-cattle-standing-on-a-dirt-road-0Vzis7uJItA?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I cancelled Herd Pro, moved thirty-four local sites to Lerd in one weekend, and kept the Herd-style
  workflow without the subscription. What broke, what surprised me, and why the dashboard won me over.
---

<!-- Never use the — character (em dash). Prefer commas, colons, or a normal hyphen (-). -->

For a long time I paid for [Laravel Herd Pro](https://herd.laravel.com/). Not because I needed every bell and whistle, but because a few of my apps rely on **Redis** and **Reverb**, and Pro was a convenient way to turn those on without wiring up extra tooling for every side project. I have always used DBngin for databases on my Mac.

I love Herd. It has saved me countless hours over the years. Spinning up a new site and wiring Redis or Reverb through the UI still feels about as simple as local PHP gets on a Mac.

Lately though I have been going through my outgoings and cutting things I do not really need. Herd Pro was on the list. Pro is **$99** a year, and for what I actually used it for, that felt a bit steep. If it had been priced lower I might have stayed. I cancelled earlier this month as the renewal was due anyway, so that is **$99** back in my pocket. What I did not have, for the longest time, was a credible free alternative that still felt like Herd on macOS.

Then I heard about [Lerd](https://lerd.sh/).

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://lerd.sh/" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Lerd</div>
<div class="bookmark-card-description">Open-source, Herd-like local PHP development for Linux and macOS. Podman-native, rootless, automatic .test domains, per-project PHP and Node, one-command TLS, and a proper dashboard.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://lerd.sh/assets/logo.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">lerd.sh</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://lerd.sh/assets/social-preview.png" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

Lerd is MIT-licensed, ships as a single binary, and aims at the same "drop your repo in and go" workflow Herd nailed. No paid tier, no account, no upgrade wall for mail, workers, or the web UI. I had been putting off a migration because Herd and Lerd both want ports **80** and **443**, so you cannot run them side by side.

This weekend I finally did it.

## Thirty-four sites in an afternoon

I stopped Herd, installed Lerd, and got AI to run the migration for me: enumerate every linked site, run `lerd link` in each project directory, pin PHP and Node versions, then `herd unlink` so nothing was left registered with the old stack. I headed out for a few hours whilst AI worked on getting everything moved over for me.

When I came back, a few steps still needed my password on the Mac: installing `podman-mac-helper` so nginx could bind **80** and **443** from rootless Podman, trusting the mkcert CA in my keychain, and fixing the `.test` resolver so macOS sent DNS to Lerd's dnsmasq on port **5300** instead of assuming loopback on port 53. After that, all **34** local sites were answering on Lerd.

## What the migration taught me (the technical bit)

**Podman, not Docker.** On macOS, Lerd runs nginx and PHP-FPM in a Podman Machine VM. Rootful mode is created fresh on install; trying to flip an existing rootless VM to rootful mid-migration broke Ignition on my machine, which was a fun twenty minutes. The happy path was `lerd machine reset`, then `lerd start`, and leaving the VM alone.

**Your Mac is not `127.0.0.1` from inside PHP.** Herd ran PHP on the host, so `DB_HOST=127.0.0.1` reached DBngin on my Mac. Lerd's PHP runs in a container. Loopback inside that container is the container, not your laptop. Every app that talked to MySQL, Redis, or Memcached on the host needed `host.containers.internal` instead. I updated `.env` files across the fleet in one pass. I will most likely drop DBngin at some point and use Lerd's MySQL service instead; for now the host bridge is what made the cutover painless.

**Storage symlinks rot.** Several Laravel apps still had `public/storage` pointing at old paths from a previous machine or username (`/Users/jon/...`). The database worked, but `/storage/...` URLs 404'd until those symlinks were recreated as relative links into `storage/app/public`. Worth checking if your images vanish after any local stack migration.

**Mail is Mailpit, not Herd's catcher.** Lerd exposes `lerd-mailpit` on port **1025** for SMTP. I pointed `MAIL_HOST` and `MAIL_PORT` at that everywhere, even before I started the service, so flipping `lerd service start mailpit` on does not require another `.env` pass.

**Reverb is per-site, not `reverb.herd.test`.** A few apps still targeted Herd's shared Reverb host and the old `laravel-herd` app key. On Lerd, Reverb runs with `lerd reverb start` per project, nginx proxies `/app` to the site's assigned server port, and queue workers should use `localhost` plus that port whilst the browser keeps using `https://your-site.test` via `VITE_REVERB_*`. Different model, same outcome, but you do migrate consciously.

**TLS is mkcert, same idea as Herd.** Browsers complained until the Lerd mkcert root was trusted in my login keychain. After that, `.test` certificates behaved.

If you want a sanity check after moving, `lerd doctor` and the dashboard's system health view are worth five minutes. They surfaced DNS and port issues faster than spelunking Podman logs.

## Why I prefer the Lerd dashboard

I did not expect to care this much about the UI.

Herd's app is fine, but I keep coming back to Lerd's dashboard (installable as a PWA, which is a nice touch). Sites are grouped by framework and version: Laravel 13 in one bucket, Statamic and Laravel 12 in others, an "Other" bucket for plain PHP or non-framework projects.

Services are the other win. I only needed Redis and Reverb from Herd Pro; Lerd's preset list goes much further (databases, cache, messaging, search, testing helpers, storage, admin UIs, and more). Toggling them from the UI or `lerd service start` is straightforward. I spun up a throwaway site to try the service wiring and honestly preferred the experience: it felt snappier, and the log output is easier to read when something fails.

System health and resource breakdown across everything running is something I did not know I wanted until I had it. When you juggle dozens of local apps, seeing nginx, PHP-FPM, and optional services in one place beats guessing which silent worker died.

On debugging, Herd and Lerd are closer than marketing makes it sound. Herd's Dumps and Insights windows already pull `dump()` and `dd()` out of the browser, alongside queries, logs, and the rest. I relied on that for years. Lerd's debug window does the same job from the dashboard, scoped per site, and I am not mourning Herd's approach there.

What Lerd adds on top is a different shape of tooling: an in-browser Tinker REPL with a real language server (Herd's `herd tinker` in the terminal is perfectly good, but this is nicer for quick pokes), one-click SPX flame graphs, worker self-heal for queues and Horizon, and a built-in MCP server so Cursor can run `lerd link`, tail logs, and start services from chat. Herd has MCP and agent hooks too; Lerd just does not tuck the useful service layer behind Pro. I have only scratched the surface, but it does not feel like a cut-down clone.

## Gratitude and a recommendation

I will always be thankful to Beyond Code for Laravel Herd. It lowered the floor for PHP on macOS and I got years of use from it, Pro included.

For my setup today, though, Lerd is where it is at. I get the Herd-shaped workflow without the subscription, plus headroom I did not have before. If you are on Herd Pro mainly for Redis and Reverb (or you like the idea of those extras without paying), and you have some time to switch everything over in one go, I would at least install Lerd and link one Laravel app before you renew.

Start with the [installation guide](https://lerd.sh/getting-started/requirements), keep DBngin or whatever you already use on the host (or spin up Lerd's MySQL if you are ready to consolidate), and remember `host.containers.internal` when your app cannot find the database. The rest is mostly `lerd link`, `lerd env`, and patience whilst Podman pulls images.
