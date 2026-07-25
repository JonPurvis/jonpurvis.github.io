---
title: I spoke about Github Actions
slug: i-spoke-about-github-actions
date: 2024-12-22T11:08:14.000Z
updated: 2026-03-29T14:48:36.000Z
tags:
  - development
  - speaking
feature_image: >-
  https://images.unsplash.com/photo-1629709305580-5a833dc72d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDR8fGNvZ3N8ZW58MHx8fHwxNzc0Nzk1NzEwfDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Mike Hindle
  profile_url: https://unsplash.com/@mikehindle?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Every month at work, we have a Tech All Hands, where our engineers get together and listen to ~60
  minutes of talks ranging from what people have been working on recently, to what's coming in the
  future, to cool tools…
---

Every month at work, we have a Tech All Hands, where our engineers get together and listen to ~60 minutes of talks ranging from what people have been working on recently, to what's coming in the future, to cool tools that people have been working with. Each speaker has a 5-10 minute slot so the pace is fairly quick, which is great because it keeps each talk exciting and engaging and it's always great to see what our engineers are working on, especially ones that you don't deal with on a day to day basis.

My talk was about [Github Actions](https://github.com/features/actions), specifically moving our CI/CD pipeline over to Github actions. This is something I've been working on for the past month or so and it's been a really good learning curve for me. I've used Github Actions in the past for really simple stuff, but I've had to step up my game to get this work over the line as the actions I've created are a lot more involved than what I've previously done. I looked into conditional check running, so basically only running checks if certain conditions are met. Github Actions makes this really easy to do, it's just an `if` statement at the top of the check. I also love how you can view the progress live, on your Pull Request, so you can see exactly where it's up to.

Our biggest issue was concurrency, which our current solution doesn't have. This massively slows down our engineers if there's a few all waiting for checks to be ran. With Github Actions, we can run as many checks at the same time has we have, no problem! Another issue I wanted to tackle is being able to re-run checks. We have a few Pull Request specific checks, including one that checks for a WIP label and if it exists, the check fails and the PR can't be merged. With our solution, you'd have to re-run the whole check suite which could take ages if there's others in the queue. With Github Actions, you can simply re-run from the browser.

My talk went over some statistics about how we currently run checks, including a bit of history. I then went on to some of the problems we're now facing and how our current solution has pretty much reached it's limit. I then spoke about a few solutions I'd thought about before finally deciding on Github actions. I was able to show some screenshots of how the pipeline looks on Github, as I'd already done the work for it all. Lastly, I was able to provide some comparison information between our current solution and Github actions but my absolute proudest one is being able to reduce the time needed to run checks for 1 pull request from 15-20 minutes to just 2-3 minutes, which is an 83% speed increase 🤯

After Christmas, I'll be putting the final touches in place and then should hopefully have this work out mid-late January 2025!
