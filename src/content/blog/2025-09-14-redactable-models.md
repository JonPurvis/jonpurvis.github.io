---
title: Redactable Models
slug: redactable-models
date: 2025-09-14T15:30:00.000Z
updated: 2026-06-14T15:30:32.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1523484489927-4aa8bf9a99d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fGdkcHJ8ZW58MHx8fHwxNzgxNDUxMDA1fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Paulius Dragunas
  profile_url: https://unsplash.com/@paulius005?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Redacting data in models is important, depending on your application. If someone chooses
  to delete their account, you may wish to retain some of the data for analytics, whilst
  removing some PII such as name, email…
---

Redacting data in models is important, depending on your application. If someone chooses to delete their account, you may wish to retain some of the data for analytics, whilst removing some PII such as name, email address, phone number etc.

Recently, my friend [Ash Allen](https://ashallendesign.co.uk/) launched a new Composer package which makes this super easy to do. You can check the package out on Github below:

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/ash-jc-allen/redactable-models" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">GitHub - ash-jc-allen/redactable-models: A package that allows you to redact, obfuscate, or mask data in your Laravel models.</div>
<div class="bookmark-card-description">A package that allows you to redact, obfuscate, or mask data in your Laravel models. - ash-jc-allen/redactable-models</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/ash-jc-allen/redactable-models" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

Using the package is a piece of cake. Let's say we have a `User` model:

```php
class User extends Model
{
    //
}
```

We need to implement the `Redactable` interface:

```php
class User extends Model implements Redactable
{
    //
}
```

This then forces the implementation of two methods; `redactable` and `redactionStrategy`. The first one is the query that runs to get which models need redacting. For example you may choose to run this periodically for accounts that registered but never logged in, or users that deleted their account a certain period of time ago. The 2nd one is where you specify the fields you want to redact and what to replace them with:

```php
use AshAllenDesign\RedactableModels\Support\Strategies\ReplaceContents;
use AshAllenDesign\RedactableModels\Interfaces\Redactable;
use Illuminate\Contracts\Database\Eloquent\Builder;

class User extends Model implements Redactable
{
    // ...
    
    public function redactable(): Builder
    {
        return static::query()->where('created_at', '<', now()->subDays(30));
    }

    public function redactionStrategy(): RedactionStrategy
    {
        return app(ReplaceContents::class)->replaceWith([
            'name' => '****',
            'email' => '****',
        ]);
    }
}
```

<aside class="callout callout-info">
<strong>Tip</strong>
<p>You can also use <code>MassRedactable</code> instead of <code>Redactable</code> to make it more efficient to handle a lot of models at once.</p>
</aside>

Once you've set your strategy up, it's just a case of running:

```
php artisan model:redact
```

And let the package do it's work!

It's a fantastic package and Ash did a wonderful job at bringing it to life. There's a few more features worth exploring, which are all detailed on the Github repo, click below to view that!

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/ash-jc-allen/redactable-models" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">GitHub - ash-jc-allen/redactable-models: A package that allows you to redact, obfuscate, or mask data in your Laravel models.</div>
<div class="bookmark-card-description">A package that allows you to redact, obfuscate, or mask data in your Laravel models. - ash-jc-allen/redactable-models</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/ash-jc-allen/redactable-models" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

