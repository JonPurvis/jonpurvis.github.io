---
title: How to get Saloon to work with Laravel Zero
slug: how-to-get-saloon-to-work-with-laravel-zero
date: 2023-08-03T00:50:00.000Z
updated: 2023-09-02T00:51:00.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1485686531765-ba63b07845a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHNhbG9vbnxlbnwwfHx8fDE2OTM2MTU4NDF8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Nikola Jovanovic
  profile_url: https://unsplash.com/@danteov_seen?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I have been using the amazing Saloon to handle my API integrations in a Laravel Zero application
  recently, as I wanted to introduce some consistency with them and generally keep my codebase nice
  and tidy. If you do…
---

I have been using the amazing [Saloon](https://github.com/saloonphp) to handle my API integrations in a Laravel Zero application recently, as I wanted to introduce some consistency with them and generally keep my codebase nice and tidy.

<aside class="callout callout-info">
<strong>Tip</strong>
<p>If you do <strong>any</strong> API integrations, I highly recommend you check Saloon out. It will make your life <em>so</em> much easier!</p>
</aside>

Along with using Saloon, I'm also using the [Saloon Laravel Plugin](https://github.com/saloonphp/laravel-plugin) package, which adds a handful of nice additions that we all love when it comes to working with Laravel applications.

The package adds a `Saloon` facade and one of the things that can do, is allow you to specify fake responses in your tests. Really similar to `Http::fake()`, if you've ever used the Laravel HTTP Client.

At first, I couldn't get this to work at all. I was getting all manner of weirdness going on, I even opened up an [issue](https://github.com/saloonphp/saloon/issues/259) on the GitHub repo as I was at a total loss as to what to do.

After going back and forth with [Craig Potter](https://twitter.com/_CPotter) for a couple of days, I randomly came up with the solution whilst putting my shoes on to go to work, of all times!

It turns out, Laravel Zero doesn't auto register service providers. This was news to me as *Laravel* itself does. So the solution was pretty simple:

```php
/**
  * Register any application services.
  *
  * @return void
  */
public function register()
{
    $this->app->register(SaloonServiceProvider::class);
}
```

After I'd manually registered the provider, guess what? Everything worked as expected!

This was a new discovery for a bunch of us, so in light of this, the [Saloon documentation](https://docs.saloon.dev/plugins/laravel-integration#laravel-zero) has been updated to mention this.

🤠
