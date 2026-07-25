---
title: I finally got round to using Laravel Pulse
slug: i-finally-got-round-to-using-laravel-pulse
date: 2025-05-04T20:26:00.000Z
updated: 2025-07-21T20:26:51.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1682706841289-9d7ddf5eb999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fHB1bHNlfGVufDB8fHx8MTc1MzEyOTQ4NXww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Joshua Chehov
  profile_url: https://unsplash.com/@joshua_chehov?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I've wanted to use Laravel Pulse for a while now but could never find the time to actually sit
  down and read through the documentation. From the bits I'd already read about it though, I could
  definitely see the use for…
---

I've wanted to use [Laravel Pulse](https://pulse.laravel.com/) for a while now but could never find the time to actually sit down and read through the documentation. From the bits I'd already read about it though, I could definitely see the use for it especially in some of the applications we have where I work.

Our current application monitoring is done via Grafana, which kinda works but we're also missing *a lot* of information which would be useful such as slow routes, application usage and slow queries. We currently use Grafana combined with the Spatie Laravel Schedule Monitor package to monitor our queues, along with a handful of database queries to monitor specific other things.

I worked with a colleague to get Pulse up and running on one of our applications and left it running overnight. When we returned the next morning, we had a dashboard full of really interesting insights! We instantly found some issues with a particular job causing it to run really really slow, so that was an instant win for us!

Most of our applications run within docker containers, so there were certain parts of Pulse we couldn't really use. We managed to get a dashboard running for one of our applications with the following:

*   Queues
*   Table Info (separate package, somewhat flakey)
*   Slow Jobs
*   Slow Queries
*   Exceptions

This particular application is CLI based, so doesn't really have a need for things like validation errors and route monitoring.

I'm slowly making my way through our applications and adding Pulse to them as so far it's been invaluable.

As an extra resource, I discovered [this repo](https://github.com/timwassenburg/awesome-pulse) which houses links to all sorts of additional cards people have built for Pulse. Whilst Pulse comes with some great cards out of the box, it's worth checking that repo for something you need incase it already exists. If you do need to build a card to suit your needs, consider open sourcing it and linking it in that repo!
