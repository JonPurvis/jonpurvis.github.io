---
title: What's new in PestPHP v3
slug: whats-coming-in-pestphp-v3
date: 2024-09-01T00:34:45.000Z
updated: 2026-03-29T15:18:55.000Z
tags:
  - pestphp
  - development
feature_image: >-
  https://images.unsplash.com/photo-1582043568776-7cc499677ab1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDQ4fHxjb2dzfGVufDB8fHx8MTc3NDc5Njc0NHww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Josh Redd
  profile_url: https://unsplash.com/@joshredd?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Now that is over for another year, it's time to look forward to the release of some of the
  stuff that was shown off. One of those things was v3 of . did a fantastic job of showing
  off what's coming to PestPHP with this…
---

Now that [LarcaonUS](https://laracon.us/) is over for another year, it's time to look forward to the release of some of the stuff that was shown off. One of those things was v3 of [PestPHP](https://pestphp.com/). [Nuno Maduro](https://x.com/enunomaduro) did a fantastic job of showing off what's coming to PestPHP with this next major release. His talk focused on 3 main features:

*   Task Management
*   Mutation Testing
*   Arch Presets

I'll be talking about all 3 of those features and my thoughts on them. I also did a bit of source code diving and found a couple of other bits that I can't wait to implement into my test suites! So without further ado, let's get started!

## PHP 8.2 Minimum

The minimum PHP version for Pest 3 is PHP 8.2. This makes sense given that the minimum version for Pest 2 is PHP 8.1. I suspect this means that the minimum version for Pest 4 will be PHP 8.3.

## Mutation Testing Plugin

So one thing I think a lot of developers get confused with is Code Coverage. Code Coverage doesn't guarantee that your tests work properly, only that when you run your tests, your code gets executed during them.

However, if you do want to ensure your tests are working properly, this is where Mutation Testing comes in. If you don't know what Mutation Testing is, it's a type of testing that makes small modifications to your application, called Mutants. With these mutants in the application, your tests are ran. If your tests fail, then the mutant is killed whereas if all your tests pass, then the mutant escapes. Your test suite is measured on how many are killed.

Mutation Testing is available to use with PestPHP v3 and it has been written completely from scratch. Nuno actually confirmed this on Twitter as there was some questions around whether it's simply a wrapper for [Infection](https://infection.github.io/guide/), which is a popular PHP Mutation Testing library.

> Cool. Will it be an infection/infection wrapper or a custom solution?
> 
> — Aleksei Gagarin (@roxblnfk) [May 10, 2024](https://twitter.com/roxblnfk/status/1788943874926293106?ref_src=twsrc%5Etfw)

Confirmation that the Pest Mutation Testing Plugin has been written from Scratch

Nuno gave a demo of this during his talk and it worked like an absolute dream, I'm so happy PestPHP is finally getting a Mutation solution and I'm looking forward to being able to run it!

## Architecture Testing Presets

Architecture testing is one of my favourite things about Pest and with every application I create, there's usually a handful of Arch tests that I copy over from one project to the next.

PestPHP v3 comes with Presets for Architecture Testing which makes it easier to execute a group of Architecture tests (defined by the PestPHP team). If we take a look at the [PR that added this functionality](https://github.com/pestphp/pest/pull/1170), we can see that instead of defining a handful of tests manually, we can do something like:

```php
arch()->preset()->laravel();
```

This will then run checks such as:

*   Are there any usages of `env` or `exit`?
*   Do all Controllers have the suffix of *Controller?*
*   Do Job classes have a *handle* method?

There's also a handful of other presets:

*   **PHP** Preset (ensures functions such as `die`, `dd`, `echo` and `print` are not used)
*   **Security** Preset (ensures functions such as `md5`, `rand`, `sha1` and `shell_exec` are not used)
*   **Strict** Preset (ensures that classes use strict typing)
*   **Relaxed** Preset (ensures that classes don't use strict typing, are not final etc...)

This is such a fantastic example of why PestPHP is so awesome because in just 1 line of code, you can ensure your application is not using PHP functions that are deemed a security risk:

```php
arch()->preset()->security();
```

## Task Management

Task Management is also coming to PestPHP and this is not something I've really thought about before now after seeing a demo of how it works, I can see how it would come in useful.

Task Management in PestPHP allows you to assign tests to users and link them to issues and pull requests. For example:

```php
it ('tests a thing to see if it works', function () {
  //
})->todo(assignee: 'jonpurvis', issue: 1);  
```

Then, when I run that test, it will show as a todo test but will also give me more context such as who is responsible for ensuring this test is complete and the issue that it relates to. I can then click through from PHPStorm directly to GitHub to view the issue directly.

## Documentation Expectations

PestPHP v3 adds a couple of new Expectations for those developers wishing to ensure that their Methods and Properties are all documented. By using `toHaveAllMethodsDocumented` and `toHaveAllPropertiesDocumented` developers can ensure that if someone new comes into a project, documentation rules are still adhered to.

> i know not everyone agrees, but something that triggers my OCD is seeing one method not documented when everything else is  
>   
> that's why, for pest 3, out at laracon us, we are bringing two new arch expectations:  
>   
> ✔ toHaveAllMethodsDocumented  
> ✔ toHaveAllPropertiesDocumented [pic.twitter.com/dKS7xv0M2t](https://t.co/dKS7xv0M2t)
> 
> — Nuno Maduro ☁️ 🦹 (@enunomaduro) [July 19, 2024](https://twitter.com/enunomaduro/status/1814294221299302555?ref_src=twsrc%5Etfw)

This is definitely not something everyone will use, a lot of developers prefer self documenting code but it's good that PestPHP v3 will give us these to use if we need them.

## Line Count Expectation

So, I actually wanted to add this myself, I even put out a Tweet which was mysterious, but the idea was to add a new expectation that will fail a test if a line count is greater than a certain number. I've seen some codebases have classes with like 20k+ lines in them 🤢

> I've just had (what I think) is a really good idea for an Arch Expectation for [@pestphp](https://twitter.com/pestphp?ref_src=twsrc%5Etfw) 👀  
>   
> Coming soon!
> 
> — Jon Purvis (@JonPurvis\_) [July 27, 2024](https://twitter.com/JonPurvis_/status/1817240491533988309?ref_src=twsrc%5Etfw)

However, when I was delving through Git Commits to prepare for this article, I saw a commit by Nuno that adds this exact expectation 🤣

This will be super useful to have. As a developer, it's incredibly easy for us to just stick another method at the bottom of an already very large file, rather than taking the time to extract whatever we're trying to add to somewhere else.

The usage of this Expectation is as simple as you'd expect it to be:

```php
test('controller line count')
    ->expect('App\Http\Controllers')
    ->toHaveLineCountLessThan(1000);
```

This will then check any of the Controller classes I have in my application and ensure their line count does not exceed 1000, thus allowing me to keep my files small and manageable and promoting extraction.

## Filesystem Permission Expectation

With PestPHP v3, we'll have access to an Expectation that allows us to check the Permissions of things in our Filesystem. For example, if we wanted to check the Preset.php file for Pest, we can do something like:

```php
expect(Pest\Preset::class)->not->toHaveFileSystemPermissions('0644');
```

In this test, if that file does have 0644 permission, then the test will fail.

## Trait Expectations

PestPHP v3 adds a couple of new Expectations for ensuring that your classes are using certain Traits:

```php
test('users should be soft deletable')
    ->expect('App\Models\User')
    ->toUseTrait(SoftDeletes::class)

```

There's also an accompanying `toUseTraits()` Expectation which allows an array of Traits that can be passed in and it will check each of them.

* * *

To close, I'm really looking forward to be able to start using PestPHP v3 in my projects. I've been waiting for this release for a while now and was able to catch the talk Nuno gave at LaraconUS about it. PestPHP continues to be the best PHP Testing framework in the world and I'm so glad it still gets all the love it's getting. It really does make testing an absolute joy to do.

This article covered some of the feature's I'm looking forward to implementing in my test suites, but for the "Official" release document, you can find that over on the PestPHP website:

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://pestphp.com/docs/pest3-now-available" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Pest v3 Now Available | Pest - The elegant PHP Testing Framework</div>
<div class="bookmark-card-description">Today, we’re thrilled to announce the release of Pest 3. As we announced at Laracon US, Pest 3 introduces Mutation Testing, arch presets, Team Management, New Configuration API,…</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://pestphp.com/www/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">Nuno Maduro</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://pestphp.com/assets/img/pest3-now-available.jpg" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

Happy Testing!
