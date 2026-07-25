---
title: Laravel Pint
slug: laravel-pint-2
date: 2022-08-06T16:12:17.000Z
updated: 2026-03-29T15:24:56.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDM0fHxjb2RlfGVufDB8fHx8MTY1OTgwMjI3MQ&ixlib=rb-1.2.1&q=80&w=2000
feature_image_credit:
  name: Vipul Jha
  profile_url: https://unsplash.com/@lordarcadius?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Pint is a PHP CS fixer, built on top of PHP-CS-Fixer. It's a new 1st party package created by the
  Laravel team. It comes installed with any new Laravel installs, but for existing installs it can
  be installed via…
---

Pint is a PHP CS fixer, built on top of [PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer). It's a new 1st party package created by the Laravel team. It comes installed with any new Laravel installs, but for existing installs it can be installed via composer.

I've recently been working on getting one of our systems at work up and running on a new VM, so it also seemed like the perfect opportunity to check out Laravel Pint and see if it can sort a rather mangled 5+ year codebase out!

Configuration for Pint is pretty minimal, in fact, I didn't actually have to do any. By default, the preset is the `laravel` standard, but you you can also choose `psr12` or `symfony` by creating a `pint.json` file in the root of your project. You can actually specify more options in this file, because it's built on top of [PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer), you can set any of the options specified [here](https://mlocati.github.io/php-cs-fixer-configurator/#version:3.9).

Upon running `./vendor/bin/pint --test`, it came as no surprise that it flagged up a fair few things! Nothing massive, but definitely parts of the codebase that needed fixing looking into.

You can run `./vendor/bin/pint -v --test` for a more detailed output of what **would** be changed, if the command was run without `--test`.

Now going through each issue manually would've been really boring, so if I run the same command again but this time remove `--test`, Pint takes care of all the issues it flagged up.

Fixing the issues with Pint took so time at all, I was then able to commit the changes to GitHub, ready to be deployed.

To ensure the codebase stays consistent, especially when multiple developers are working on it, I'd quite like to get this built into a GitHub status check OR even have something running in the background which automatically commits style changes to GitHub. Those are ideas for future me to explore at some point!

I'd definitely recommend giving [Laravel Pint](https://laravel.com/docs/9.x/pint) a go. One thing to note is that it looks like it's only available for Laravel 9 applications, so you'll need to ensure your application is up to date before installing it.
