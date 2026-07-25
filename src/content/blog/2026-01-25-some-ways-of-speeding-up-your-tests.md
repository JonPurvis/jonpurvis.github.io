---
title: Some ways of speeding up your tests
slug: some-ways-of-speeding-up-your-tests
date: 2026-01-25T16:19:00.000Z
updated: 2026-04-11T15:20:30.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1634402149804-67614eb48331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDExfHxzcGVlZHxlbnwwfHx8fDE3NzU5MDI5Nzd8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Ian Taylor
  profile_url: https://unsplash.com/@carrier_lost?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  At work, I've been focusing on getting the test suites for our various Shopify apps running
  quicker. The biggest gain was switching our CI/CD pipelines to use Pest Parallel testing, but our
  runners only have 2 processes…
---

At work, I've been focusing on getting the test suites for our various Shopify apps running quicker. The biggest gain was switching our CI/CD pipelines to use Pest Parallel testing, but our runners only have 2 processes so although they are quicker now, it's only slightly quicker.

I didn't want the number of processes on the machine be the only thing we could rely on for test speed, so I dug a little deeper.

## PCOV

This one I haven't actually done yet, I'm hoping to get some time in the next couple of months to play around swapping Xdebug for PCOV to see if it helps. Xdebug, whilst beneficial, is quite slow, and we're only using it for code coverage. PCOV can offer us that, without everything else.

## `Sleep::fake()`

A couple of our apps were using the native PHP `sleep()` function. This meant that in our tests, `sleep(3)` would execute within the test and add an extra 3 seconds to it. Now imagine a series of tests, each sleeping for 3 seconds, not good!

The solution here was simple. Instead of using `sleep()` we instead now use the Laravel `Sleep` facade, so we now do `Sleep::for(3)->seconds();`. Our tests define `Sleep::fake()` which, as you'd expect, fakes the facade usage, which means our tests don't actually sleep for 3 seconds! We added this to our `TestCase.php` file so that it only needed adding once per app, rather than every file that needed it.

## `Http::preventStrayRequests()`

The other thing I spotted is we were making a bunch of GraphQL calls, without mocking them, this wasn't causing much of a speed issue, but it was taking some time because tests were making real http requests to the outside world.

This is something else I ended up adding to `TestCase.php` so we don't have to worry if a developer forgets to fake a request they are making, `preventStrayRequests` will catch it.

* * *

I think the biggest win is going to be when I can find the time to switch Xdebug for PCOV. I've seen a lot of talk online about how much quicker it an execute tests and I'm excited to try it out!
