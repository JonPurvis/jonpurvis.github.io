---
title: Adding Video Support to the Laravel AI SDK
slug: adding-video-support-to-the-laravel-ai-sdk
date: 2026-04-19T16:29:00.000Z
updated: 2026-05-02T16:31:55.000Z
tags:
  - development
  - ai
feature_image: >-
  https://images.unsplash.com/photo-1674027444454-97b822a997b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDI2fHxhaXxlbnwwfHx8fDE3Nzc2MzIyOTZ8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Growtika
  profile_url: https://unsplash.com/@growtika?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  One of the Shopify Apps I've been working on recently uses PrismPHP. PrismPHP forms some of the
  foundation of the Laravel AI SDK which we hope to switch to at some point however for most of the
  development of our app,…
---

One of the Shopify Apps I've been working on recently uses PrismPHP. PrismPHP forms some of the foundation of the Laravel AI SDK which we hope to switch to at some point however for most of the development of our app, the Laravel AI SDK required a PHP84 minimum, we're currently on PHP83.

One of the features our app has is the ability to generate images via AI, either completely from scratch OR by feeding in up to 3 source images. This is really cool but one of the ideas I had for a future version of the app, is to allow AI generated videos to be created too.

I'm not 100% sure on the reason, but neither PrismPHP or the Laravel AI SDK have anything in place for video generation, so I set to work adding it to the latter!

I really love the syntax of being able to generate an image with the SDK:

```php
$image = Image::of('A donut sitting on the kitchen counter')->generate();
```

So I wanted to keep it similar. I eventually landed on this:

```php
Video::of('A short clip of a city at night with neon lights')
    ->queue(provider: 'openai')
    ->onQueue('process-videos')
    ->then(fn ($response) => $response->storePublicly(path: 'videos', disk: 'public'))
    ->catch(fn (\Throwable $e) => report($e));
```

The `onQueue` is particularly important. You probably do not want this to run in sync because of how long it takes, so dispatching to a queue and having it processed via a job makes sense.

I created a simple demo application to test it out, so taking the prompt above, this is what happens:

0:00

/0:11

 1× 

Example of generating AI videos

The original video was a bit longer, I trimmed out most of the wait time so you can see the good stuff quicker!

The PR is yet to be merged, but you can take a look at the implementation below. [Pushpak](https://x.com/pushpak1300), from the Laravel team has actually assigned themself to the PR, so could this mean it's going to get worked on further and we'll soon see it in the package? Hopefully!

[

Video Support by JonPurvis · Pull Request #305 · laravel/ai

Hey 👋 This PR lets you generate videos with the AI SDK, pretty much the same way it already works images. Here are some key points: Video::of() API, Same idea as images: describe the clip, tweak o…

![](https://static.ghost.org/v5.0.0/images/link-icon.svg)GitHublaravel

![](/images/posts/adding-video-support-to-the-laravel-ai-sdk/inline-01.jpg)

](https://github.com/laravel/ai/pull/305)
