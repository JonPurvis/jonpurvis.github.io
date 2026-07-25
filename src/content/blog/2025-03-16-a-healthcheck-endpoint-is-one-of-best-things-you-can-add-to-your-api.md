---
title: A healthcheck endpoint is one of best things you can add to your API
slug: a-healthcheck-endpoint-is-one-of-best-things-you-can-add-to-your-api
date: 2025-03-16T21:29:00.000Z
updated: 2025-07-20T20:29:40.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGhlYWx0aHxlbnwwfHx8fDE3NTMwNDMzNjh8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Online Marketing
  profile_url: https://unsplash.com/@impulsq?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Whilst scrolling on Twitter earlier (yes, I still refuse to call it X), I stumbled across a Tweet
  by Gary Clarke: �‍⚕ A healthcheck endpoint is a simple API route that acts as a service’s
  heartbeat, showing if it’s…
---

Whilst scrolling on Twitter earlier (yes, I still refuse to call it X), I stumbled across a Tweet by [Gary Clarke](https://x.com/garyclarketech):

> 🧑‍⚕️ A healthcheck endpoint is a simple API route that acts as a service’s heartbeat, showing if it’s alive & healthy.  
> The Laravel Microservice course is released on 31st March 🚀  
> …learn more and grab discount here 👇[https://t.co/fxjfvAuYNb](https://t.co/fxjfvAuYNb) [pic.twitter.com/LV0jFoe7WT](https://t.co/LV0jFoe7WT)
> 
> — Gary Clarke (@garyclarketech) [March 16, 2025](https://twitter.com/garyclarketech/status/1901267457341562928?ref_src=twsrc%5Etfw)

This got me thinking about all of the APIs I've built and aside from one or two, I naturally end up building a healthcheck endpoint, just to verify the thing actually works.

The endpoint itself doesn't need to do anything fancy. Although the example in Gary's screenshot returns some JSON, I actually tend to just return a `200 OK` response. This way, I can see if the API is up and make sure that I can use my API token to successfully authenticate with it.

Here's the endpoint for a SaaS I'm currently working on:

```php
public function __invoke(Request $request): JsonResponse {
  return response()->json(['status' => 'ok']);
}
```

Example Healthcheck Endpoint

I can then create this in something like Postman as a request, send it to my API and ensure it works OK.
