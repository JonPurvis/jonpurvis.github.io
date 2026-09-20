---
title: Jev is for decisions, not chat
slug: jev-is-for-decisions-not-chat
date: 2026-09-20T16:00:00.000Z
tags:
  - ai
  - development
feature_image: /images/posts/jev-is-for-decisions-not-chat/header.png
excerpt: >-
  TypeSafe's Jev is not an LLM. You cannot chat to it. I ripped the chat assistant out of my
  personal finance system and replaced it with typed Noul, Score, and Choice decisions.
---

<!-- Never use the — character (em dash). Prefer commas, colons, or a normal hyphen (-). -->

TypeSafe launched [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) a few days ago. I joined the waitlist, and I had a key a couple of hours later.

Jev is not an LLM. You cannot chat to it. That is the entire point.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Introducing System One Models &amp; Jev</div>
<div class="bookmark-card-description">TypeSafe's first System One model: state in, typed decisions out.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://framerusercontent.com/images/aNFzSFxM4fjICmnibw7npfZjcQ.png" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">typesafe.ai</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://framerusercontent.com/images/RtIGTDwO43jR4ZDilesXiR5znc.jpg" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

## It will not talk to you

People will try to prompt it like ChatGPT. It will not write code, summarise a PDF, explain why it answered that way, or generate a single sentence. You send it a `state` plus typed `questions`. You get numbers your code can branch on. TypeSafe calls this a System One model: a frontier-intelligence function call.

If you want prose, you still want Claude, GPT, or Grok.

## Why I actually wanted it

I have a private Laravel app for my personal finances. Not a product, not a bank. Just the place I keep the numbers so I can answer "can I buy this right now?" without opening six spreadsheets.

The obvious AI move was a chatbot. Before Jev, I bolted a local assistant onto it with the Laravel AI SDK and Ollama (`gemma4:12b`). Streaming replies, conversation memory, nested specialist agents, PHP tools over those same calculators.

What I actually wanted was not a conversation. It was: given what is left, is buying X right now a smart idea?

Chat was the wrong product.

Follow-ups had no useful context. I asked how much I had per day for the rest of the cycle, then asked "how long left". It answered with a completely different countdown from elsewhere in the app. I meant days left in the pay cycle.

It also picked the wrong figure for "outgoings left this month": the calendar-month total, not unpaid in this cycle. I even built a 100-question live eval to catch it.

And it was slow. Thinking mode made the UI look frozen. Title generation could stall for about a minute. I capped tool steps, turned thinking off, killed title gen, and still had a 12B decode plus extra hops for every specialist agent. I spent time trying to speed the model up (MLX, smaller Qwen) instead of changing the shape.

Then I used Jev's playground, and it clicked. All I care about is getting answers to decisions.

## Noul, Score, Choice

Every question is one of three [primitives](https://docs.typesafe.ai/primitives). You can mix them in a single request. They all see the same state, they run in parallel, and your code composes the answers.

**[Noul](https://docs.typesafe.ai/primitives/noul)** is yes/no as a probability from 0 to 1. Near 1 is a strong yes, near 0 is a strong no, near 0.5 is a coin flip. It is not "medium", and there is no separate confidence field. In the buying screen I ask whether the purchase fits available cash, whether it would harm savings goals, and whether the timing is sensible. The cycle screen asks whether spending is on track until payday.

**[Score](https://docs.typesafe.ai/primitives/score)** is an ordered rubric you write, 2 to 10 levels. Jev returns a score that can sit between two levels, a probability for each level, and confidence. Stretch of a purchase is Comfortable, Noticeable, or Reckless. Cycle risk is Fine, Watch, or Overspending.

**[Choice](https://docs.typesafe.ai/primitives/choice)** picks one of up to 255 labelled options. You get the winner, the full distribution, and confidence. For a purchase that is `buy_now`, `wait`, or `dont_buy`. For the cycle: `keep_going`, `slow_down`, or `pause_discretionary`.

TypeSafe's advice is one snap judgment per question, then combine in code. The buying screen fans five questions out in one call:

```php
'recommendation' => [
    'type' => 'choice',
        'instructions' => 'What should I do about buying this item right now?',
    'criteria' => [
        'buy_now' => 'Affordable and sensible to buy now.',
        'wait' => 'Possible later. Wait for payday, clear bills, or a better moment.',
        'dont_buy' => 'Should not buy given current cash, unpaid outgoings, or savings pressure.',
    ],
],
```

The other four sit next to it: three Nouls (`fits_available_cash`, `harms_savings_goals`, `timing_sensible`) and a Score for stretch. One round trip. PHP decides what the UI actually says.

## Wiring it in

Each decision is a small PHP class with `state()`, `questions()`, and `compose()`. Laravel builds JSON state from fact slices (spending cycle, cashflow, savings), posts that plus the question map to `https://api.typesafe.ai/v1/systemone` with `jev-latest`, and `compose()` turns the typed answers into a verdict the UI can show.

The hard rule that fell out of the chat eval: never ask Jev how much is left. Put `available_after_outgoings` in the state, then ask whether the purchase is prudent. Unpaid means unpaid in this pay cycle, never the calendar-month total.

If a Choice's confidence is under 0.45, the composer refuses the optimistic path. `buy_now` becomes `wait`. `keep_going` becomes `slow_down`. The raw pound facts still sit on the verdict so I can see what it was looking at.

Live Pest evals sit behind `TYPESAFE_EVAL_LIVE=1`. A USB cable at £8 should come back `buy_now` or `wait` with an affordability noul above 0.55. A luxury car at £45k plus £800 a month should be `dont_buy` or `wait` with a fit noul under 0.45. Ground-truth tests assert the tool state matches the Support calculators, including the unpaid-vs-month-total trap chat fell into.

## What I actually use it for

**Should I buy this?** Item, one-off, optional monthly. A cheap essential mid-cycle (that USB cable) is a high affordability noul and `buy_now`. A big discretionary buy when cash is tight is a timing noul that says wait, even if savings could cover it. Raiding a savings goal for a gadget is where `harms_savings_goals` is the useful number, not a chatty pep talk.

**Am I on track this pay cycle?** No purchase, just burn vs remaining cash after unpaid bills. Takeaways stacking up mid-cycle should flip to `slow_down` or `pause_discretionary` before payday. The value is a typed verdict with a confidence I can threshold, not a paragraph of advice. The app still owns the policy.

## It is stupidly cheap

Jev bills **input tokens only** at **$0.042 per million**. Output is free. You get **$5 free credit a month**. I have used it a lot: playground, live evals, consulting the tools. **$0.0018**.

A local 12B was slow and wrong. Asking a frontier LLM to emit JSON for a yes/no is paying generation prices for a gate. If your code currently asks an LLM "yes or no, pick a bucket, rate this", Jev is a better tool. If you want it to write the email afterwards, that is still an LLM's job. The [docs](https://docs.typesafe.ai/introduction) and [console](https://console.typesafe.ai/) are the place to start.
