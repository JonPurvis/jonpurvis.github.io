---
title: You should have a decent CI/CD pipeline
slug: you-should-have-a-decent-ci-cd-pipeline
date: 2025-05-11T20:52:00.000Z
updated: 2025-07-21T20:52:22.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1507823690283-48b0929e727b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHBpcGV8ZW58MHx8fHwxNzUzMTMxMTI0fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Quinten de Graaf
  profile_url: https://unsplash.com/@quinten149?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  It'll save you a lot of time... Since starting work on the SaaS I've been helping with for around
  18 months now, it's given me a lot of time to explore CI/CD and how to build a solid pipeline
  which means we can ship…
---

It'll save you a lot of time...

Since starting work on the SaaS I've been helping with for around 18 months now, it's given me a lot of time to explore CI/CD and how to build a solid pipeline which means we can ship good quality product enhancements in the easiest way possible. The pipeline we currently have has been built up over several months of learning, the first version was nowhere near what it is today. As issues cropped up from time to time, we adjusted as we went.

We're using GitHub actions and Laravel Forge for our pipeline and the whole thing ensures the application is performant in several areas and if it is, deploys it. If issues are found, the pipeline is halted until they are resolved. In a nutshell, the GitHub action does the following:

*   Checks the repository out from GitHub
*   Sets PHP 8.4 up with Composer and XDebug
*   Installs composer dependencies
*   Runs Laravel Pint
*   Runs Rector
*   Runs PHPStan
*   Runs application unit tests
*   Runs Profanity check

I can be confident that all major parts of the application are working with every change, the code is clean, consistent and professional and adheres to the Rector rules I set. Once those checks have passed on GitHub, I can merge the PR and then Laravel Forge takes over to do the deployment. I've added some extra steps to the default deployment script you get within Forge, but again, in a nutshell:

*   Runs `git reset --hard`
*   Checks out the origin branch (`main`)
*   Installs composer dependencies
*   Installs and builds NPM dependencies
*   Runs database migrations
*   Restarts the queue workers
*   Clears the route cache
*   Generates the API documentation (we use [Scribe](https://scribe.knuckles.wtf/))
*   Caches the routes
*   Generates the Sitemap (we use [Laravel Sitemap](https://github.com/spatie/laravel-sitemap) from Spatie)
*   Syncs scheduled jobs (we use [Laravel Schedule Monitor](https://github.com/spatie/laravel-schedule-monitor) from Spatie)
*   Clears compiled views
*   Restarts PHP FPM
*   Pings [OhDear](https://ohdear.app/) to schedule in a site check
*   Notifies slack of a new deployment

It's a fair few steps, but it works for us. There's very little human interaction and because we have a great set of checks in GitHub, we're confident in every single deployment we make that it's not going to cause big problems with the platform.

I wanted something that involved humans as little as possible. I didn't want to have to sit and monitor something and manually progress it. This pipeline executes that vision perfectly. If needed, I can merge a PR from my phone and have it deploy in a minute or so! As we're not deploying a broken platform, there's never been any real need to rollback, aside from a pesky Vite issue last year!

If you're running anything that requires CI/CD, *please* invest time into making a decent pipeline. You will save yourself so much time in the future!
