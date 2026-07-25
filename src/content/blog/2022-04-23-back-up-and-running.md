---
title: Back Up and Running!
slug: back-up-and-running
date: 2022-04-23T15:18:17.000Z
updated: 2025-07-20T12:41:40.000Z
tags:
  - general
feature_image: >-
  https://images.unsplash.com/photo-1629709304968-627a15a1936c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDh8fGNvZ3xlbnwwfHx8fDE2NTA3MjM2NDk&ixlib=rb-1.2.1&q=80&w=2000
feature_image_credit:
  name: Mike Hindle
  profile_url: https://unsplash.com/@mikehindle?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Well it's been a couple of months since I last posted anything here! It's been a busy couple of
  months but after some maintenance on this site, it's back up and running! Somehow the SSL had
  expired, even though I'm sure…
---

Well it's been a couple of months since I last posted anything here! It's been a busy couple of months but after some maintenance on this site, it's back up and running!

Somehow the SSL had expired, even though I'm sure it should've auto renewed, getting that sorted was the first step so I could access the site the do the rest. Luckily this was possible using the Ghost CLI, although I did have to upgrade it first, so running:

```bash
npm install -g ghost-cli@latest
```

will upgrade the Ghost CLI to the latest version. You can then run the following to renew the SSL:

```bash
ghost setup ssl-renew
```

Once I could access the site, I realised I was running an out of date version of Ghost, `4.37` to be exact, but `4.45`, again using the Ghost CLI, this update is as simple as running:

```
ghost update --no-mem-check
```

The `--no-mem-check` is important as this bypasses a memory check which when fails, prevents Ghost from updating. Ghost recommends having 150MB available however I have only half of that and yet to notice any issues.
