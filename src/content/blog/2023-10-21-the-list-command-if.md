---
title: The Saloon `list` command
slug: the-list-command-if
date: 2023-10-21T22:54:59.000Z
updated: 2026-03-29T15:22:52.000Z
tags:
  - development
  - saloonphp
feature_image: >-
  https://images.unsplash.com/photo-1491333078588-55b6733c7de6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fHNhbG9vbnxlbnwwfHx8fDE2OTc5Mjg4ODR8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Mary Rebecca Elliott
  profile_url: https://unsplash.com/@beckeli?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  If you're using Laravel for your application and Saloon for your API Integrations, you should also
  be using the Saloon Laravel Plugin to make it even easier to use Saloon! One of the cool things
  about the plugin is that…
---

If you're using [Laravel](https://laravel.com/) for your application and [Saloon](https://github.com/saloonphp) for your API Integrations, you should also be using the [Saloon Laravel Plugin](https://github.com/saloonphp/laravel-plugin) to make it even easier to use Saloon!

One of the cool things about the plugin is that it provides a super easy way of seeing all of your integrations, with one handy command:

```bash
php artisan saloon:list
```

By running that command, I can see that my application currently has 3 integrations. GitHub, Stripe and Twitter. Furthermore, I can see some quick stats about each integration, for example my Stripe integration has 6 Requests and 1 Plugin. I can also see a list of Authenticators, Connectors, Requests, Plugins and Responses for each Integration and for my Requests, it even shows me what type of method they are and the endpoint they go to!

Under the hood, this makes use of the artisan `twoColumnDetail` method, which makes CLI output look *so* much nicer!

The command initially assumes all of your Integrations live within an `App/Http/Integrations` directory, however, if you're using an approach such as DDD, you might have your Integrations live in a different directory. If this is the case with your application, this command may not return the correct results. To combat this, there's a config key within the `saloon.php` config file, which you can use to point the command to the place your Integrations actually do live. The code for the command simply does the following, to get a list of them:

```php
protected function getIntegrations(): array
{
    return glob(config('saloon.integrations_path').'/*') ?? [];
}
```

Hopefully you find this command useful, I had a lot of fun building it as it was something that came from working on one of my applications which does have a lot of Integrations, I wanted an easy way of seeing them all without having to click through loads of different directories!

You can find the PR that added the command [here](https://github.com/saloonphp/laravel-plugin/pull/46). If you can think of other stuff that would be useful for the command to show, feel free to [open an issue](https://github.com/saloonphp/laravel-plugin/issues) or [open a pull request](https://github.com/saloonphp/laravel-plugin/pulls).
