---
title: The Github Security Advisory Process
slug: the-github-security-advisory-process
date: 2026-04-05T11:17:59.000Z
updated: 2026-04-05T11:17:59.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1548092372-0d1bd40894a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fHNlY3VyaXR5fGVufDB8fHx8MTc3NTM4Nzg2Nnww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Philipp Katzenberger
  profile_url: https://unsplash.com/@fantasyflip?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  A few weeks back, I woke up to a text from my good friend Sam Carré who I co-maintain SaloonPHP
  with. He'd received an email overnight from a security researcher who claimed to have found 3
  security vulnerabilities with…
---

A few weeks back, I woke up to a text from my good friend [Sam Carré](https://x.com/carre_sam) who I co-maintain [SaloonPHP](https://docs.saloon.dev/) with. He'd received an email overnight from a security researcher who claimed to have found 3 security vulnerabilities with SaloonPHP.

Both our first thoughts was that it was some sort of scam. After all, it came out of nowhere and we had no idea who the sender was. The more we looked into it though, the more we realised it was a legit email. I started to investigate each of the 3 vulnerabilities pointed out in the email and was able to replicate all 3 of them.

The security researcher was very professional; he disclosed the issues in a sensible way, provided potential patches to implement and provided information for us to put in our security advisories.

Over the next several evenings, Sam and Myself set out to fix the 3 issues. I did some initial work during a lunch break during the week and we then tightened up each fix before releasing a new version of Saloon. It was a few very late nights of work as we wanted to ensure that the fixes we were putting in were going to work and not introduce *new* issues.

We tagged Saloon V4, which was disappointing as we had big plans for V4, but one of the fixes was a breaking change so it was very much "needs must".

We then had to learn all about Github Security Advisories and the CVE process. This was our first time dealing with Github Security Advisories and I can totally see how it could be daunting the first time you deal with them. Thankfully though, the researcher provided enough information for us to put some drafts together and was then able to answer some follow up questions for us to then be able to publish them.

Once published, there was a couple of days before Github assigned a CVE ID to each of the advisories. I think this is a manual job done by Github, and it involves getting advisories added to the [Common Vulnerabilities and Exposures database](https://www.cve.org/). This is a website that lists all publicly disclosed security vulnerabilities. There are a lot of company that have partnered with the database, Github is just one of them.

Last thing for us to do was get people to ensure they are using the patched version of Saloon, so Sam [sent out a tweet](https://x.com/carre_sam/status/2036905822773481473). I didn't actually realise Composer did this, but they prevent you from updating to a version of a package that has a known vulnerability, which should also help prompt people to update. Note that this only works once Packagist have picked up the advisories, which I believe is done *after* they've been published and assigned a CVE ID. There was definitely a delay between publishing and Packagist picking them up, even after clicking the update button within Packagist.

I hope this post has given you some insight into an area of Open Source that a lot of people won't ever have to do. It was definitely a learning experience for me and in the event I have to do it again, I feel like I'm much more prepared. I just hope I *don't* have to do it again!

<aside class="callout callout-info">
<strong>Note</strong>
<p>I've kept this post light-weight on the details of each issue that was reported. If you want more information on them though, they are available on the SaloonPHP repository on Github.</p>
</aside>
