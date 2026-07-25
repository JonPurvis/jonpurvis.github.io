---
title: Method Selection in the SaloonPHP Laravel Plugin
slug: method-selection-in-the-saloonphp-laravel-plugin
date: 2023-12-03T21:05:00.000Z
updated: 2026-03-29T15:22:27.000Z
tags:
  - development
  - saloonphp
feature_image: >-
  https://images.unsplash.com/photo-1517775747136-ee3cbba0f07b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDEzfHxzYWxvb258ZW58MHx8fHwxNzA3MDgwNzAyfDA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Vidar Nordli-Mathisen
  profile_url: https://unsplash.com/@vidarnm?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I'm a huge fan of SaloonPHP created by my good friend Sam Carré and would recommend anyone checks
  it out if you deal with API integrations! Part of SaloonPHP is the Laravel Plugin, again, massive
  fan of that! In order…
---

I'm a **huge** fan of [SaloonPHP](https://github.com/saloonphp) created by my good friend [Sam Carré](https://twitter.com/carre_sam) and would recommend anyone checks it out if you deal with API integrations!

Part of SaloonPHP is the [Laravel Plugin](https://github.com/saloonphp/laravel-plugin), again, massive fan of that! In order to create a new API Request, you'd run the following command

```php
php artisan saloon:request
```

This will then ask you the Integration it's for and the name of the Request. Fantastic! *But* there's one thing I was finding myself having to do and that was, unless my Request was a `GET` request, I'd always have to do into my new Request class and update the method to whatever it *should* be.

I thought it would be handy if the package asked you this when you ran the artisan command to create it and then used that input to populate the Method in the class. After all, it already asks you for the related Integration and a name for the Request, so why not also ask what type of Request it should be?

With the power of [Laravel Prompts](https://laravel.com/docs/10.x/prompts#main-content), I was able to make an amazing way of doing exactly what I needed! After you've entered your Integration and Request name, you will now also be asked to select what type of Request it is.

Saloon will then take that input value and under the hood, ensure it's set as the value of `$method` within the Request class:

```php
/**
 * Replace the method for the stub
 */
protected function replaceMethod(string $stub, string $name): string
  {
    return str_replace('{{ method }}', $name, $stub);
  }
```

Then, when we come to build the class, we call the above method:

```php
$stub = $this->replaceMethod($stub, $method);
```

I also had to make a small amendment to the stub file for Requests. Previously the method was hardcoded as `GET`:

```php
protected Method $method = Method::GET;
```

So to ensure that we were replacing it with whichever method was selected during creation, I changed it to use a placeholder, which I'm then searching for in the `replaceMethod()` method:

```php
protected Method $method = Method::{{ method }};
```

I love making QoL improvements such as this. Sure, it's not the biggest and most groundbreaking change, but it saves me time when creating any new Request classes.

If you want to take a look at the Pull Request that introduced this functionality, you can [find it on GitHub](https://github.com/saloonphp/laravel-plugin/pull/50).
