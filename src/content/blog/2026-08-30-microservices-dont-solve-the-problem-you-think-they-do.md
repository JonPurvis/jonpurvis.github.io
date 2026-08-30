---
title: Microservices don't solve the problem you think they do
slug: microservices-dont-solve-the-problem-you-think-they-do
date: 2026-08-30T21:30:00.000Z
tags:
  - development
  - ai
feature_image: >-
  https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000
feature_image_credit:
  name: Taylor Vick
  profile_url: https://unsplash.com/@tvick?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Microservices mostly solve an organisational problem. Drawing from experience, modern monoliths,
  and what agents were like across repos a few months ago.
---

I've been meaning to write about this for a while. I've started this post more than once and left it unfinished. [Emma De Silva](https://x.com/EmmaDSCodes) posted about monorepos and agentic coding, and while this article isn't directly related, it got me thinking again and finally pushed me to finish it:

> Monorepos for the win. Working on HydePHP Cloud. Feel this is extra useful with agentic coding when working on projects with multiple parts as the agent working on one part can just check how an interconnected part works without relying on docs that may be out of date.
>
> — Emma De Silva (@EmmaDSCodes) [August 30, 2026](https://x.com/EmmaDSCodes/status/2094059520959918189)

Microservices *can* buy you technical things. Independent deploys, scaling one part of the system without dragging everything else along, isolation when something falls over, even different stacks in different places if you really need that. I'm not going to pretend those benefits don't exist.

But that isn't usually the problem people think they're solving when they reach for microservices.

Most teams I see talking about microservices are chasing cleaner code, easier maintenance, or "modern architecture". What microservices are actually really good at is an *organisational* problem: lots of teams shipping without constantly stepping on each other. That trade-off makes sense at companies the size of Microsoft, Google, or Amazon, with thousands of engineers working across hundreds of services. For everyone else, you often pay the distributed-systems tax without getting the organisational win that made the tax worth paying.

For a couple of years microservices were the cool thing. Buzz-term energy. Companies jumped straight in because it looked like the grown-up architecture, without stopping to ask what problem they were actually trying to solve.

Drawing from experience, where I work we moved from a massive, complex monolith that was around a decade old into microservices. Those microservices came with their own complications. Looking back, I don't think we implemented them properly, for two main reasons:

1. **The engineering team wasn't big enough for the problem microservices solve.** Roughly 30 engineers spread across 8 or 9 services. That is not the organisational scale where independent service ownership starts paying for the overhead.
2. **Everything depended on one "parent" service.** If that was down, each child service was basically redundant. We had network boundaries on paper, but tight coupling in practice. That's the classic distributed monolith failure mode: you get the pain of distributed systems without the autonomy or failure isolation people sell you.

In my opinion, we'd have been better sticking with the monolith approach, but investing in a *modern* one. By that I mean a modular monolith: one primary deployable, clearer module boundaries and ownership, shared platform where it helps. Not "leave the ten-year-old ball of mud alone forever". A lot of the structure people want from microservices can live inside a well-shaped monolith without every call becoming a network hop.

Which brings me back to Emma's point about monorepos. A monorepo isn't the same thing as a monolith. You can put multiple services in one repo, and you can also keep a modular monolith in one tree. The useful bit for agents, though, is having one workspace they can actually see.

A few months ago I ran some experiments with AI agents across multi-repo setups. Even when I gave them plenty of context, they struggled once the work spanned multiple repositories. They were much happier in a single codebase. Agents may well have got better at this since then. Honestly, I haven't tried it recently, so take that as my experience at the time rather than a claim about today's tools. Still, it lines up with why a monorepo (or at least one primary workspace) feels practical when you're asking an agent to reason about interconnected parts of a system.

Microservices aren't wrong. They're often just solving a different problem than mid-size teams think they have. Until you've got the organisational scale for independent service ownership, or a real need for isolation and independent scaling, I'd rather take the boring modular monolith and keep the complexity in one place you can actually reason about.
