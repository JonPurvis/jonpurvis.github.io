---
title: Why choosing the right AI model is important
slug: why-choosing-the-right-ai-model-is-important
date: 2025-04-13T21:23:00.000Z
updated: 2025-07-20T21:56:29.000Z
tags:
  - ai
  - development
feature_image: >-
  https://images.unsplash.com/photo-1721314787850-5745fdfb06b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDl8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8fHwxNzUzMDQ4MjE4fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Igor Omilaev
  profile_url: https://unsplash.com/@omilaev?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  The SaaS I'm currently building integrates with the OpenAI API to perform various tasks. I'd
  consider most of these tasks to be quite straight forward. We're not passing massive amounts of
  data to OpenAI and aren't…
---

The SaaS I'm currently building integrates with the OpenAI API to perform various tasks. I'd consider most of these tasks to be quite straight forward. We're not passing massive amounts of data to OpenAI and aren't getting much data back from OpenAI so therefore our token usage is quite low. They do, however, perform an important part of the platform so it's vital they are performant.

I've recently been monitoring our OpenAI usage and in particular, cost. I had an idea on how to improve it so we could spend less, but get the same functionality. I wanted to tackle this early on before it becomes a problem with the more customers than onboard onto the platform though.

All of our jobs that interact with OpenAI in the application were using `GPT-4.1 mini` as the model. I did some testing with each one and gathered the output. This model pricing is **$0.40 / 1M tokens** for input and **$1.60 / 1M tokens** for output. Whilst those prices are fine, I wanted to see if we could actually use `GPT-4.1 nano` instead which is much cheaper at **$0.100 / 1M tokens** for input and **$0.400 / 1M tokens** for output.

The application currently uses the OpenAI API in 6 different places. I went through each place and swapped the call to use the `GPT-4.1 nano` model and compared the output against the `GPT-4.1 mini` model. Doing this allowed me to actually swap 5 of the 6 places to use `GPT-4.1 nano` as I saw no noticeable difference. The one remaining place that uses `GPT-4.1 mini` makes sense and using `GPT-4.1 nano` for this actually made it worse so I restored this part of the code to it's original state.

This means that the majority of the application is now using a much more cost effective model and also means we're not hindering on what the platform offers because the output was the same.

This was a good lesson to learn. Just because you *can* use a modal, you shouldn't blindly use it. If there's absolutely no benefit between the model you're using and a cheaper one, roll with the cheaper one!
