---
title: PCOV for code coverage
slug: pcov-for-code-coverage
date: 2026-05-17T16:52:00.000Z
updated: 2026-06-13T16:52:28.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1536909526839-8f10e29ba80c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHJhY2luZ3xlbnwwfHx8fDE3ODEzNjk1Mjl8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Ralfs Blumbergs
  profile_url: https://unsplash.com/@rblumbergs?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  In Some ways of speeding up your tests I mentioned about using PCOV as an alternate for Xdebug for
  code coverage. Xdebug is fantastic, but it can be quite slow, which means when you're running your
  tests in a CI/CD…
---

In [Some ways of speeding up your tests](/some-ways-of-speeding-up-your-tests/) I mentioned about using PCOV as an alternate for Xdebug for code coverage. Xdebug is fantastic, but it can be quite slow, which means when you're running your tests in a CI/CD environment, your pipelines can start to get quite slow!

Well, since then, I have actually converted all of the Shopify apps I build at work, to use PCOV instead of Xdebug and the results were just as I expected, much faster pipeline runs!

I initially tested it on the app I was working on at the time. The app had a suite of 1205 tests, which equalled 4309 assertions:

![](/images/posts/pcov-for-code-coverage/inline-01.png)

Xdebug Output

As you can see, I was running it with 2 processes and it took 57.49 seconds. This time isn't bad by any means, I've seen some test suites of a similar size take several minutes to run, however we can improve this time!

Once I'd got PCOV configured, I reran the exact same test suite with the same number of processes:

![](/images/posts/pcov-for-code-coverage/inline-02.png)

PCOV Output

24.92 seconds?! That's a 56% speed increase! 🤯

Once this was done, I set aside some time to go through the rest of our apps and convert them to use PCOV. I would *highly* recommend you do the same. Especially if this is the only thing you're using Xdebug!
