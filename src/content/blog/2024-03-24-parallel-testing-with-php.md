---
title: Parallel Testing with PestPHP
slug: parallel-testing-with-php
date: 2024-03-24T18:04:00.000Z
updated: 2026-03-29T15:20:50.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1530347480513-7914ca3595cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fHRyYWluJTIwdHJhY2tzfGVufDB8fHx8MTcyMjA5MzQxMnww&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Ethan Cull
  profile_url: https://unsplash.com/@natruls?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  You may have guessed that I'm a big fan of PestPHP and one of the biggest things I love about it
  is how easy it is to run your tests in parallel, by simple passing --paralell flag into your run
  command. You can specify…
---

You may have guessed that I'm a big fan of [PestPHP](https://pestphp.com/) and one of the biggest things I love about it is how easy it is to run your tests in parallel, by simple passing `--paralell` flag into your run command. You can specify the number of processes to use or it'll just use the amount that's available, in my case it used 12 processes.

I have an application at work that uses PestPHP and using just 1 process, it takes around 20 seconds to run the whole suite.

This isn't really bad, the tests do a good chunk of asserting various things so I'm happy with this run time, however, I also want to improve it 🤣. Part of the test suite for this application seeds an additional local database with data, which one of my commands then grabs the data from, unfortunately running my tests in Parallel didn't work first time because of how I was running the SQL on this database, so I had to tweak a couple of things to get it to work. Once that was done, I ran it and was amazed with the results.

Less than 3 seconds to run the entire test suite?! 🤯 Amazing! The other bonus is because we run this through a CI/CD pipeline, I was able to cut a little bit of the time it took to run the whole pipeline down too. Unfortunately it's not as quick when running in the Pipeline because our CI/CD provider ([Semaphore](https://semaphoreci.com/)) only provides machines with a maximum of 8 processes 😢. Still though, a saving is a saving.
