---
title: Alternate Design Patterns with SaloonPHP
slug: alternate-design-patterns-with-saloon-php
date: 2024-02-12T00:13:36.000Z
updated: 2026-03-29T15:21:23.000Z
tags:
  - development
  - saloonphp
feature_image: >-
  https://images.unsplash.com/photo-1460129105763-a10bea1ccc53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fHdpbGQlMjB3ZXN0fGVufDB8fHx8MTcwNzY5Njc2NHww&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Eniko Polgar
  profile_url: https://unsplash.com/@eniko?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  So if you've used SaloonPHP, you'll know it's pretty awesome. In fact, I have several posts about
  it on this site and it's one of my favourite tools! Quite some time ago, I added the ability to
  run php artisan…
---

So if you've used [SaloonPHP](https://docs.saloon.dev/), you'll know it's pretty awesome. In fact, I have several posts about it on this site and it's one of my favourite tools!

Quite some time ago, I added the ability to run `php artisan saloon:list` from the Laravel Plugin and have it spit out all sorts of information regarding your API integrations.

You can [view the PR](https://github.com/saloonphp/laravel-plugin/pull/46) that added the list command on GitHub. Before it was merged, Saloon creator and all round good guy, [Sam Carré](https://twitter.com/carre_sam) asked me if it handled integrations that don't follow the default `App/Http/Integrations` directory structure and actually, it didn't! Which meant, if you're application used something like DDD, running `php artisan saloon:list` would return absolutely nothing, because it expected things to live within `App/Http/Integrations`.

My proposed solution was to add a config value which allowed the user to specify where their integrations lived, within their application:

```php
return [
    'integrations_location' => 'App/Http/Integrations'
];
```

After all, the `saloon.php` config file was already a thing so the only real bit of work to do was to tweak the list command to look in the path specified in the config file, instead of the previously hardcoded `App/Http/Integrations` directory.

Once I'd got that working, we were good to go! Sam made another suggestion of having that config value actually determine where new classes would live when using one of the generator commands, we agreed to do it as a separate PR to as not halt this command any further!

In September 2023, [an issue](https://github.com/saloonphp/laravel-plugin/issues/47) was raised on the [Saloon Laravel Plugin](https://github.com/saloonphp/laravel-plugin) repository regarding getting the `integrations_path` config value (it was renamed shortly before merge) to be respected when creating new classes.

In February 2024, [an issue](https://github.com/saloonphp/saloon/issues/367) was raised on the [Saloon](https://github.com/saloonphp/saloon) repository for the same thing however by this point, I'd already started and actually finished a solution, it just needed reviewing and merging!

The solution itself was actually pretty simple, clocking in at a whole 21 extra lines of code!

Previously, Saloon would work out the Namespace with the following method:

```php
protected function getDefaultNamespace($rootNamespace)
{
    return str_replace('{integration}', $this->getIntegration(), $rootNamespace . $this->namespace);
}
```

So I knew that was the method that would need tweaking, I wanted to keep the method nice and clean though, so I opted to create two new methods:

This method will remove `\\Http\\Integrations` from the namespace, we don't want this bit because we'll eventually be getting this from the config file.

```php
protected function getFormattedNamespace(): string
{
    return str_replace('\\Http\\Integrations', '', $this->namespace);
}
```

This method will convert our integrations path from the config file, into a namespace friendly string, which we can then use in conjunction with `getFormattedNamespace()`

```php
protected function getNamespaceFromIntegrationsPath(): string
{
    $namespace = (array)str_replace(['\\App', '\\app'], '', str_replace('/', '\\', str_replace(base_path(), '', config('saloon.integrations_path'))));

    return $namespace[0];
}
```

With those 2 methods in place, it was time to tweak `getDefaultNamespace()` to actually use them:

```php
protected function getDefaultNamespace($rootNamespace)
{
    $namespace = $this->getNamespaceFromIntegrationsPath() . $this->getFormattedNamespace();

    return str_replace('{integration}', $this->getIntegration(), $rootNamespace . $namespace);
}
```

So the return part is the same as before except instead of `$this->namespace`, we're setting a `$namespace` variable above which is a concat of our 2 new methods.

So that's it! If you run one of the generator commands e.g. `php artisan saloon:request`, it will place that class in whatever you've set as your integrations path in the config file. If you don't have it set, then it will fall back to the default value of `App/Http/Integrations`.

If you want to check the PR that added the solution to this, you can [find it on GitHub](https://github.com/saloonphp/laravel-plugin/pull/56).
