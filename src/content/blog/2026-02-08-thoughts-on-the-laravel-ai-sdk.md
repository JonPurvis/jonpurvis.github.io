---
title: Thoughts on the Laravel AI SDK
slug: thoughts-on-the-laravel-ai-sdk
date: 2026-02-08T00:38:00.000Z
updated: 2026-04-08T23:38:42.000Z
tags:
  - development
  - ai
feature_image: >-
  https://images.unsplash.com/photo-1727434032765-9c4df88b6e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDM4fHxhaXxlbnwwfHx8fDE3NzU2OTE1MTB8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Luke Jones
  profile_url: https://unsplash.com/@lukejonesdesign?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This week I took the Laravel AI SDK for a spin! It hasn't officially released yet, I think that'll
  be coming at Laracon, but it's on Github and available to pull down into a project so I did just
  that! The Laravel AI…
---

This week I took the Laravel AI SDK for a spin! It hasn't officially released yet, I think that'll be coming at Laracon, but it's on Github and available to pull down into a project so I did just that!

The Laravel AI SDK sits on top of [PrismPHP](https://prismphp.com/), which already does an amazing job at making working with LLM's within Laravel, an absolute breeze. The Laravel AI SDK is the first package Taylor Otwell himself has built for a number of years now, the last one being (I think) Folio.

The SDK allows you to easily connect to providers such as Anthropic, Gemini, Ollama, OpenAI and Voyage and much like things like databases and services, live inside a `config/ai.php` file.

Provider support is incredibly varied, offering support for text, images, text to audio, audio to text, embeddings, reranking and files.

The SDK is build up of agents, which, like everything else in Laravel can be created with the `make:agent` artisan command. An agent is just a PHP class that contains things like instructions, context, output schema and more, to be able to interact with the LLM. This means that everything is in one place and you don't have your context in one area and your output structure somewhere else.

As this is a first party package, it uses syntax that should be familiar to you, if you've used Laravel before. This makes it super easy to pick up and just work with it. I was able to get an app up and running with the ability to generate images using Gemini in just a matter of minutes!

One of my favourite features is the failover support. This allows you to specify another agent that will be used, in the event that your first agent is unresponsive. So for example if you have Gemini specified as the agent and OpenAI as the failover, if you prompt Gemini to do something and the service isn't available, the SDK will automatically hand the request over to OpenAI to handle instead. This is a fantastic feature because as great as these agents are, they aren't always the most reliable.

There's a couple of questions I did have though:

1) Why PHP84 as the minimum? I can't find any feature that the SDK offers that would require PHP84 to be the minimum version so unless I'm missing something, I would've thought PHP83 would be a better minimum. Okay, this might be slightly selfish given the projects I want to use this on run on PHP83.

2) Why no video support? OpenAI can do videos and I think this would be super powerful for the SDK to be able to do!

I loved using the AI SDK and I'm glad Laravel now has a first party package for interacting with LLMs. It could not work more seamlessly with an existing Laravel application and even spinning up a new application and using it is really straight forward. This is now the go to way of interacting with LLMs via Laravel!
