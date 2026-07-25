---
title: You should be using Dependabot
slug: you-should-be-using-dependabot
date: 2022-01-09T00:00:00.000Z
updated: 2026-03-29T14:50:02.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1629135458283-0c69f7cead37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDh8fGNvZ3N8ZW58MHx8fHwxNzc0Nzk1NzEwfDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Lucas Santos
  profile_url: https://unsplash.com/@_staticvoid?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  As a Developer, Dependabot is fast becoming one of my favourite tools. It automatically scans your
  project dependencies and will create Pull Requests to keep them all up to date. I think of it as
  an extra member of my…
---

As a Developer, Dependabot is fast becoming one of my favourite tools. It automatically scans your project dependencies and will create Pull Requests to keep them all up to date. I think of it as an extra member of my team, who's sole purpose is to keep an eye on all of our dependencies and let us know if any need updating, it even makes the Pull Request for us, we just need to check it and merge it!

Dependabot started life as a standalone tool but it was acquired by Github in 2019 and is now fully integrated. It helps me out pretty much daily to ensure the projects I manage are using secure, up to date packages.

I've been trialing it on a project at work for some months now, in-fact the first PR it created was to **Bump league/flysystem from 1.1.3 to 1.1.5**. This update actually fixed a security vulnerability in the package.

Since then, Dependabot has submitted 42 Pull Requests to the project to help keep the dependencies up to date. The combined time it would've taken me to manually do this is many hours.

The PR's it creates means you don't really need to leave your repo to find out *what* the update is changing, because thankfully, it contains all of that information.

I've expanded it so you can see, but the PR is split into 3 sections of information:

*   Release Notes
*   Changelog
*   Commits

Additional links are provided if you do want more information, but this is usually enough for me to go on. There's also a list of additional commands you can pass in such as `@dependabot merge` which will auto merge the PR providing your CI checks pass or `@dependabot rebase` if you wish to rebase the PR.

Dependabot automatically deletes any branch in creates, if any changes on the master branch cause a merge conflict, any pull requests that are affected will be automatically rebased, you can also manually trigger this.

This past week, I've been working on getting Dependabot integrated into more of our projects at work, this allowed me to identify some *really* old versions of packages we were using and ensure they're now up to date. It also made my contribution graph look like I've been a lot busier than I actually have 😂

If you have a project that you want to integrate Dependabot into, it's pretty simply to do. All you need is a `/github/dependabot.yml` file in your project! There's a **ton** of options you can put in here, all explained on the [Github Docs](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates) but the ones I have are actually pretty simple, for example:

```yml
version: 2
updates:
  - package-ecosystem: composer
    directory: "/"
    schedule:
      interval: daily
      timezone: Europe/London
      time: "9:00"
    open-pull-requests-limit: 5
    reviewers:
      - JonPurvis
    labels:
      - dependencies
```

Example dependabot.yml File

As you can see, it's pretty straightforward. I specify the package manager I'm using, in this case it's composer but it could be `npm` or if I was using Go, `gomod`. You can specify as many package managers as you want, as different blocks within the same `dependabot.yml` file.

I then tell it what directory it can find my package manifest for the package manager I specify, e.g. `composer.json`. I have this set to the root directory of the project. I can then set up a schedule for when Dependabot should run on this repository. I have it set to run daily at 9am for my timezone. I don't want it to completely spam me with Pull Requests to look at, so I set `open-pull-requests-limit` to 5. This means if Dependabot runs and there's already 5 open pull requests from it, it won't create anymore. If there's 4, it'll create 1 new one. This is handy especially on older projects where you're more likely to get spammed with PRs.

I can then specify a reviewer, or list of reviewers by using their Github username. When a Pull Request is created, it will also automatically assign anyone in this list as a reviewer. When adding Dependabot to different projects, I thought about who'd most likely benefit from getting review requests for this project, so some projects have 1 reviewer and others have 3.

Lastly, I like to assign a *dependencies* label to Dependabot pull requests, so I can use it with filters when searching for Pull Requests. If you do specify a label, or a set of labels, make sure they're created on the repo first, otherwise Dependabot will complain about not being able to add a label!

* * *

There we have it! I hope you've found this somewhat interesting and I also hope you'll give Dependabot a try. Like I said earlier in the post, it's like having an extra team member who worries about this stuff so we humans don't have to. I no longer have to "schedule time" to make sure packages are up to date, or deal with issues when I end up with a pair of incompatible packages, Dependabot takes care of it all!
