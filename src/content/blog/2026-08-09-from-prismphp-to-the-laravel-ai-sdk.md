---
title: From PrismPHP to the Laravel AI SDK
slug: from-prismphp-to-the-laravel-ai-sdk
date: 2026-08-09T12:00:00.000Z
tags:
  - development
  - ai
feature_image: >-
  https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Y29kZXxlbnwwfHx8fDE3NzYyMzY4MTZ8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Arnold Francisca
  profile_url: https://unsplash.com/@clark_fransa?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  On Friday we ran a bit of a hackathon at work, mainly to burn through some leftover Cursor tokens
  before they reset. One of the things I tackled was converting one of our Shopify apps from
  PrismPHP over to the Laravel AI SDK…
---

On Friday we ran a bit of a hackathon at work, mainly to burn through some leftover Cursor tokens before they reset on the 8th. One of the things I tackled was converting one of our Shopify apps from PrismPHP over to the Laravel AI SDK.

This work is still in draft and nowhere near live. It was more of an experiment to see how painful (or not) the migration would be. Spoiler: it was surprisingly approachable.

I wanted to make the switch for two reasons. Laravel AI is a first party package. Yes, it still uses PrismPHP under the hood, but sitting on the official package means we pick up whatever the Laravel team adds next without reinventing it ourselves. The other big one is built-in failover support. We already have our own failover pipeline for model cascades and transport timeouts, and being able to lean on the SDK for that kind of resilience feels like the right direction.

A few things stood out while doing the conversion:

**Agents are a nicer home for generation.** Structured output used to live as schema objects built inside the service. Now there's an `AltTextGenerator` agent that implements `HasStructuredOutput`, holds the instructions, schema, temperature, token limits, and Gemini provider options in one place. The service focuses on building context and wiring the cascade, which is much easier to follow.

**Failover got clearer, not replaced overnight.** Laravel AI exposes a `FailoverableException`, so our existing pipeline can treat SDK failover cases the same as transport timeouts. We still cascade across models ourselves, but the "should we try again?" decision is cleaner than guessing from Prism-specific exceptions.

**Testing got a lot simpler.** We deleted a couple of custom Prism fakes and switched to `AltTextGenerator::fake()`, plus a small helper for queuing structured responses and thrown failures. Failover tests that used to fight the Prism fake layer now read like normal Pest.

It's still a bit transitional. Prompt strings still come from the old Prism config in places, and there's a tidy-up pass left before I'd call it done. But as a Friday experiment into "how far can we get with Laravel AI?", it was a solid one. First party packages, agent-shaped generation, and better fakes make a pretty convincing case for finishing the job.
