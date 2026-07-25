---
title: Dutch Support added to Profanify and how you can contribute
slug: dutch-support-added-to-profanify-and-how-you-can-contribute
date: 2025-02-16T17:04:07.000Z
updated: 2026-03-29T14:48:04.000Z
tags:
  - packages
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1569842231034-553c0535f691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGR1dGNofGVufDB8fHx8MTc3NDc5NTY3N3ww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Hendrik Kuterman
  profile_url: https://unsplash.com/@hendrik_martin?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I'm happy to announce that Profanify now has support for the Dutch language, thanks to Stanley
  Kinkelaar! Dutch means that Profanify now supports 5 languages, with plenty more to go! Support is
  available for: * English…
---

I'm happy to announce that [Profanify](https://github.com/JonPurvis/profanify) now has support for the Dutch language, thanks to [Stanley Kinkelaar](https://github.com/stanleykinkelaar)! Dutch means that Profanify now supports 5 languages, with plenty more to go! Support is available for:

*   English
*   Italian
*   Arabic
*   Portuguese
*   Dutch

If you don't know what Profanify is, it's a PestPHP plugin that scans your codebase and looks for profanity. It comes with features such as word inclusions and word exclusions and using it is as simple as:

1.  Installing it as a dependency

```bash
composer require jonpurvis/profanify --dev
```

2.  Adding a test

```php
expect('App')
    ->toHaveNoProfanity()
```

As it's a PestPHP plugin, you can chain this on to methods in the Expectations API and it works wonderfully! If you are running your tests as part of your CI/CD pipeline, it will stop pesky profanity making its way to production.

I'm looking to expand the languages that it can support so to help with that, I've recently created a [series of GitHub issues](https://github.com/JonPurvis/profanify/issues) to add support for 5 more languages:

*   German
*   Hindi
*   French
*   Chinese
*   Japanese

If you're a native speaker of any of those languages, please consider submitting a Pull Request to kickstart support for any of them. It doesn't have to be full support, as it can be added to over time, but I'd love to be able to get started with supporting them.

If you're yet to check out Profanify, you can read all about it below or check out the [Repository on GitHub](https://github.com/JonPurvis/profanify).

[

Announcing Profanify

This weekend, I decided to work on a new plugin for PestPHP. If you don’t already know, PestPHP is one of my absolute favourite tools. I use it on a pretty much daily basis and I love working with it, whether it be adding new Expectations to the PestPHP framework,

![](/images/posts/dutch-support-added-to-profanify-and-how-you-can-contribute/inline-01.ico)Jon PurvisJon Purvis

![](https://jonathanpurvis.co.uk/content/images/2024/08/Profanify--1--1.png)

](/announcing-profanify/)
