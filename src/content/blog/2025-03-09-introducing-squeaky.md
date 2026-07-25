---
title: Introducing Squeaky
slug: introducing-squeaky
date: 2025-03-09T03:09:00.000Z
updated: 2026-03-29T13:01:14.000Z
tags:
  - packages
  - development
feature_image: >-
  https://images.unsplash.com/photo-1618038483079-bfe64dcb17f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDIxfHxjbGVhbnxlbnwwfHx8fDE3NzQ3ODkyNTJ8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Pille R. Priske
  profile_url: https://unsplash.com/@pillepriske?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  It's been a while since I've created a new package, so I'd like to introduce you to Squeaky! A
  Laravel validation rule to help catch profanity. You can check out the repo below, which includes
  instructions on how to set…
---

It's been a while since I've created a new package, so I'd like to introduce you to [Squeaky](https://github.com/JonPurvis/squeaky)! A Laravel validation rule to help catch profanity. You can check out the repo below, which includes instructions on how to set it up and some examples to get you started:

[

GitHub - JonPurvis/squeaky: ✨ A Laravel Validation Rule to Help Catch Profanity.

✨ A Laravel Validation Rule to Help Catch Profanity. - JonPurvis/squeaky

![](https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg)GitHubJonPurvis

![](https://opengraph.githubassets.com/c5313b6c508bcff26f4a85268dee854f43c1a8a7b85f6ee8bbf60aa626c74a8e/JonPurvis/squeaky)

](https://github.com/JonPurvis/squeaky)

So how did Squeaky come about? Well, [Profanify](https://github.com/JonPurvis/profanify) recently enjoyed an [article on Laravel News](https://laravel-news.com/profanify), highlighting the package and what it can do. In the Tweet for that article was this reply:

> An interesting use case would be to modify this to be a Laravel validator to check request data
> 
> — Tim Leland (@TimLeland) [February 17, 2025](https://twitter.com/TimLeland/status/1891635019040317933?ref_src=twsrc%5Etfw)

So that got me thinking, could I extend Profanify to work as a Laravel validation rule, to do the same thing but for user submitted information? I had 3 choices:

*   Build it into the existing package
*   Build it into Laravel Core
*   Build it as a separate package that uses Profanify

I decided to go with the 3rd one as in my mind, it was the best of the 3 for numerous reasons. I did attempt a PR to get it directly into Laravel, but it was getting too messy and I'm 99.9% sure it would not have been merged anyway.

So I set about building Squeaky. This was my first time working on a package specifically to be used in Laravel applications but luckily, [Spatie](https://spatie.be/) came to the rescue with their [Package Skeleton](https://github.com/spatie/package-skeleton-laravel) for Laravel applications, this gave me a great head start. You can view the source code to find out exactly how it's built, there's not much code to it really!

Under the hood, Squeaky uses the config files from Profanify, to know what to fail the validation on. There's a really handy method available in Service Providers called `mergeConfigFrom`, which I use to merge the Profanify config, with a Squeaky config. The Squeaky config is then used in the validation rule:

```php
$this->mergeConfigFrom(base_path('vendor').'/jonpurvis/profanify/src/Config/profanities/ar.php', 'profanify-ar');
```

So how does it work? Well, in it's most basic form, let's imagine you have a form that allows a user to write a biography about themselves, in your existing validation rules (which you should have!) you can simply add the new "Clean" rule to them:

```php
return [
    'name' => ['required', 'string', 'max:255', new Clean],
    'email' => [
        'required',
        'string',
        'lowercase',
        'email',
        'max:255',
        Rule::unique(User::class)->ignore($this->user()->id),
    ],
    'bio' => ['required', 'string', 'max:255', new Clean],
];
```

That's all! By default it works with your application locale defined in your `.env` file however certain applications can work with several locales, so you have the ability to pass in an array of locales and each one will be checked. Thanks to [Ash Allen](https://x.com/AshAllenDesign) for that contribution!

So by pairing Profanify and Squeaky, you can ensure both your code base and user submitted input is nice and clean 🧼
