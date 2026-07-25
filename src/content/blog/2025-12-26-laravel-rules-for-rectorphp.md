---
title: Laravel Rules for RectorPHP
slug: laravel-rules-for-rectorphp
date: 2025-12-26T18:09:00.000Z
updated: 2026-06-13T17:09:45.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fGNoZWNrbGlzdHxlbnwwfHx8fDE3ODEzMjI2NDV8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Kelly Sikkema
  profile_url: https://unsplash.com/@kellysikkema?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I'm a huge fan of RectorPHP. It makes upgrading your codebase so much easier. I'd recommend
  everyone goes and checks it out! I can guarantee once it's installed, you wont want to remove it!
  I recently heard about this…
---

I'm a **huge** fan of [RectorPHP](https://github.com/rectorphp/rector). It makes upgrading your codebase so much easier. I'd recommend everyone goes and checks it out! I can guarantee once it's installed, you wont want to remove it!

I recently heard about [this package](https://github.com/driftingly/rector-laravel), which adds a whole host of Laravel specific rules to Rector. For example, if you want to bring your application up to Laravel 12 standards, you can apply the `UP_TO_LARAVEL_120` set list:

```php
return RectorConfig::configure()
  ->withSets([
    LaravelLevelSetList::UP_TO_LARAVEL_120,
  ]);
```

I'll hazard a guess and say next year, there will be a `UP_TO_LARAVEL_130` set list available! Aside from the version of Laravel, there's also 50+ rules you can use, such as:

*   AbortIfRector
*   AddHasFactoryToModelsRector
*   ConfigToTypedConfigMethodCallRector
*   EloquentMagicMethodToQueryBuilderRector
*   RemoveDumpDataDeadCodeRector

You can find a full list [here](https://github.com/driftingly/rector-laravel/blob/main/docs/rector_rules_overview.md). I can already see some rules that I'm definitely interested in bringing in to my applications!
