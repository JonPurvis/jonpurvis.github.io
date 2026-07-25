---
title: 'PHP 8.5: Pipe Operator'
slug: php-8-5-pipe-operator
date: 2025-06-08T21:00:00.000Z
updated: 2026-06-14T21:01:00.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1543674892-7d64d45df18b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fHBpcGVzfGVufDB8fHx8MTc4MTQ3MDgzM3ww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: T K
  profile_url: https://unsplash.com/@realaxer?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  PHP 8.5 is fast approaching. I wanted to look at some of the features I'm most excited about. One
  of which is, the pipe operator. This makes it easier for developers who need to chain multiple
  callables who previously…
---

PHP 8.5 is fast approaching. I wanted to look at some of the features I'm most excited about. One of which is, the pipe operator. This makes it easier for developers who need to chain multiple callables who previously may have done something like this:

```php
$temp = "Hello World";
$temp = htmlentities($temp);
$temp = str_split($temp);
$temp = array_map(strtoupper(...), $temp);
$temp = array_filter($temp, fn($v) => $v != 'O');
$result = $temp;
```

Whilst there's nothing wrong with the above code, it is quite ugly and quite hard to read. Imagine if it was doing double what it's currently doing? It would be even harder to read!

The pipe operator in PHP (`|>`) will allow us to do the following:

```php
// Using the pipe operator in PHP 8.5
$result = "Hello World"
    |> htmlentities(...)
    |> str_split(...)
    |> fn($x) => array_map(strtoupper(...), $x)
    |> fn($x) => array_filter($x, fn($v) => $v != 'O');
```

I think this is easier to read and follow what it's doing.

If you want to take a look over the RFC, you can find that below:

[

PHP: rfc:pipe-operator-v3

![](/images/posts/php-8-5-pipe-operator/inline-01.ico)

](https://wiki.php.net/rfc/pipe-operator-v3)

If you want to take a look over the Pull Request that implemented this feature, that can be found here:

[

RFC: Pipe operator by Crell · Pull Request #17118 · php/php-src

cf: https://wiki.php.net/rfc/pipe-operator-v3 Vote has been approved, code seems clean, it should be mergable as soon as CI is happy.

![](/images/posts/php-8-5-pipe-operator/inline-02.svg)GitHubphp

![](/images/posts/php-8-5-pipe-operator/inline-03.jpg)

](https://github.com/php/php-src/pull/17118)
