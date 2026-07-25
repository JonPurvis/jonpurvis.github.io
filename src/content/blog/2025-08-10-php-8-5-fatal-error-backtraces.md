---
title: 'PHP 8.5: Fatal Error Backtraces'
slug: php-8-5-fatal-error-backtraces
date: 2025-08-10T21:21:00.000Z
updated: 2026-06-14T21:21:28.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1619884889432-b242fdee532a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fHNlYXJjaGluZ3xlbnwwfHx8fDE3ODE0NzIwNjV8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Daniel Lerman
  profile_url: https://unsplash.com/@dlerman6?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This is the 3rd in my mini series, exploring some of the features of PHP 8.5, which is
  coming in November. Previously we explored the Pipe operator and the new `--diff` flag for
  `php ini`: This time we're exploring the…
---

This is the 3rd in my mini series, exploring some of the features of PHP 8.5, which is coming in November. Previously we explored the Pipe operator and the new `--diff` flag for `php ini`:

<figure class="bookmark-card">
<a class="bookmark-card-link" href="/php-8-5-pipe-operator/">
<div class="bookmark-card-content">
<div class="bookmark-card-title">PHP 8.5: Pipe Operator</div>
<div class="bookmark-card-description">PHP 8.5 is fast approaching. I wanted to look at some of the features I'm most excited about. One of which is, the pipe operator. This makes it easier for developers who need to</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="/favicon.png" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">Jon Purvis</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://images.unsplash.com/photo-1543674892-7d64d45df18b?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fHBpcGVzfGVufDB8fHx8MTc4MTQ3MDgzM3ww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=2000" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

<figure class="bookmark-card">
<a class="bookmark-card-link" href="/php-8-5-diffing-the-ini-file/">
<div class="bookmark-card-content">
<div class="bookmark-card-title">PHP 8.5: Diffing the ini file</div>
<div class="bookmark-card-description">This is a follow up post to the first in this mini series where I explore some of my favourite features in the upcoming PHP 8.5, coming in November. The first post explored</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="/favicon.png" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">Jon Purvis</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://images.unsplash.com/photo-1719085202242-1daca0f5adcb?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fHNwb3QlMjB0aGUlMjBkaWZmZXJlbmNlfGVufDB8fHx8MTc4MTQ3MTE4NHww&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=2000" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

This time we're exploring the `fatal_error_backtraces` setting being added. Which allows developers to see backtraces for fatal errors. Let's take this code:

```
class A {
    public function loadClassB() {
        require 'b.php';
        return new B();
    }
}
 
class B {}
 
class C {
    public function loadClassA() {
        return new A();
    }
}
 
 
(new C())->loadClassA()->loadClassB();
```

Then in another file

```
class B {};
```

Currently you'd get:

```php
Fatal error: Cannot declare class B, because the name is already in use in /app/scripts/b.php on line 3
```

But in PHP 8.5, you'd see:

```
Fatal error: Cannot redeclare class B (previously declared in /app/scripts/index.php:11) in /app/scripts/b.php on line 3
Stack trace:
#0 /srv/app/index.php(6): require()
#1 /srv/app/index.php(21): A->loadClassB()
#2 {main}
```

This new setting will be enabled by default in PHP 8.5, you are free to disable it if you want to though!
