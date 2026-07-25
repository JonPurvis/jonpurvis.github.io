---
title: Announcing Profanify
slug: announcing-profanify
date: 2024-08-03T16:09:00.000Z
updated: 2026-03-29T15:11:49.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1676935753519-a8dcb3ed5fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fG1hY2hpbmFyeXxlbnwwfHx8fDE3NzQ3OTcxMDV8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Data Lore
  profile_url: https://unsplash.com/@datalore?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This weekend, I decided to work on a new plugin for PestPHP. If you don't already know, PestPHP is
  one of my absolute favourite tools. I use it on a pretty much daily basis and I love working with
  it, whether it be…
---

This weekend, I decided to work on a new plugin for [PestPHP](https://pestphp.com/). If you don't already know, PestPHP is one of my absolute favourite tools. I use it on a pretty much daily basis and I love working with it, whether it be adding new Expectations to the PestPHP framework, or consuming it in one of my applications. I've wrote about it on this blog before, so feel free to check out my other posts:

[

PestPHP - Jon Purvis

All of my posts related to PestPHP, the elegant PHP testing framework. With a focus on simplicity, it is meticulously designed to bring back the joy of testing in PHP.

![](/images/posts/announcing-profanify/inline-01.ico)Jon Purvis

![](https://jonathanpurvis.co.uk/content/images/2024/08/PestPHP-Banner.png)

](/tag/pestphp/)

Anyway, on to Profanify! The package is a Profanity checker for PestPHP, which makes it incredibly easy to scan your application for usages of Profanity. As developers, we've all faced moments of frustration, whether it be debugging an issue or trying to decipher confusing code written by someone else. These moments can sometimes result in the inclusion of profanity in your code.

So why did I build this?

Recently, I'd been working on fixing an issue in a work project for a couple of weeks and it was pretty solid, as in, I wasn't really working on much else because of the importance of it, it **had** to be resolved because of the nature of it.

I was getting more and more frustrated, I'd started littering various files with comments which were half useful information and half swear words to get out my confusion and frustration about why things weren't working.

The issue ended up getting resolved, and it turns out it was actually a 3rd party we use that caused it, however, it did give me some ideas on how I can refactor some things our side so that it doesn't impact us again. I was, however, left with code comments containing either useful nuggets of information or just sweary rants, which I went through and removed. That's when the idea for Profanify hit me, how great would it be for me to just have a test in my application, that scans the codebase and highlights any swear words, making it easy for me to then just go through and remove them 😍

Profanify seemed like the perfect candidate to become a PestPHP plugin, and I already had experience building PestPHP plugins thanks to one I built earlier this year called Lawman:

[

GitHub - JonPurvis/lawman: 🤠 A PestPHP Plugin to Help with Architecture Testing for SaloonPHP Integrations.

🤠 A PestPHP Plugin to Help with Architecture Testing for SaloonPHP Integrations. - JonPurvis/lawman

![](https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg)GitHubJonPurvis

![](https://opengraph.githubassets.com/c2cc422556a251ba269d7c95b9f9b93a421c0ac4c2d115786f4dfe0e358f8d85/JonPurvis/lawman)

](https://github.com/JonPurvis/lawman)

I laid the groundwork on Friday night and then on Saturday morning / afternoon, I hacked away until I had something that worked, I spent a couple of hours tinkering with it until I was completely happy with it, before releasing it to the world!

With Profanify, you can ensure your application has no profanity in just a couple of lines:

```php
test('the application contains no profanity')
    ->expect('App')
    ->toHaveNoProfanity();
```

Under the hood, it's pretty simple. The package comes with a config file that contains over 1000+ profanity words, using the shiny new `toHaveNoProfanity()` expectation, it loops over files in the given namespace and checks whether any of the words in the config file appear in the file. If a word is found, then the test fails and the output will show you the exact line that has profanity and in IDE's such as PHPStorm, you can click straight through to it 🔥

As this is a PestPHP plugin, we can of course combine this with all of the other Expectations Pest has to offer, for example, there might be a reason you want to include profanity:

```php
test('the application contains no profanity')
    ->expect('App')
    ->not
    ->toHaveNoProfanity();
```

I had fun building this package and I hope it comes in useful for your projects! You can find the repo for Profanify below, so feel free to check it out if you get chance and let me know what you think! Contributions are always welcome, just open a Pull Request!

[

GitHub - JonPurvis/profanify: 🧼 A PestPHP Plugin to Help Catch Profanity in Your Applications.

🧼 A PestPHP Plugin to Help Catch Profanity in Your Applications. - JonPurvis/profanify

![](https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg)GitHubJonPurvis

![](https://opengraph.githubassets.com/87ac3aad85107c7ce32e88326cf5ecd581da908934aac391d2fb6065c5dd5b88/JonPurvis/profanify)

](https://github.com/JonPurvis/profanify)

To get started using the package, you can use Composer to add it to your application as a dev dependancy

```bash
composer require jonpurvis/profanify --dev
```
