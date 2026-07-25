---
title: 'PHP 8.5: Diffing the ini file'
slug: php-8-5-diffing-the-ini-file
date: 2025-07-27T21:06:00.000Z
updated: 2026-06-14T21:06:51.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1719085202242-1daca0f5adcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fHNwb3QlMjB0aGUlMjBkaWZmZXJlbmNlfGVufDB8fHx8MTc4MTQ3MTE4NHww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Buddha Elemental 3D
  profile_url: https://unsplash.com/@buddhaelemental3d?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This is a follow up post to the first in this mini series where I explore some of my favourite
  features in the upcoming PHP 8.5, coming in November. The first post explored the Pipe operator:
  PHP 8.5: Pipe OperatorPHP…
---

This is a follow up post to the first in this mini series where I explore some of my favourite features in the upcoming PHP 8.5, coming in November. The first post explored the Pipe operator:

[

PHP 8.5: Pipe Operator

PHP 8.5 is fast approaching. I wanted to look at some of the features I’m most excited about. One of which is, the pipe operator. This makes it easier for developers who need to chain multiple callables who previously may have done something like this: $temp = “Hello World”

![](/images/posts/php-8-5-diffing-the-ini-file/inline-01.ico)Jon PurvisJon Purvis

![](/images/posts/php-8-5-diffing-the-ini-file/inline-02.jpg)

](/php-8-5-pipe-operator/)

This post is all about a new flag being added to `php ini` ,the `--diff` flag .

This flag will allow you to see what has been changed, when compared with the default set of values. It's not often I need to go into a `php.ini` file, but there have been times where I've often wanted to see a history of a certain value. As of PHP 8.5, developers can run `php ini --diff` to see what is different. The output will look something like:

```
$ php --ini=diff

Non-default INI settings:
allow_url_include: "0" -> ""
display_errors: "1" -> ""
```

This is definitely a nice QoL improvement!
