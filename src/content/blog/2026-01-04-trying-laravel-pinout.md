---
title: Trying Laravel Pinout
slug: trying-laravel-pinout
date: 2026-01-04T17:44:00.000Z
updated: 2026-04-11T16:45:30.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1586256053828-a36b572ab01d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGJyZWFkYm9hcmR8ZW58MHx8fHwxNzc1OTI1OTE3fDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Harrison Broadbent
  profile_url: https://unsplash.com/@harrisonbroadbent?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  At Laravel Live last year, I got to watch a talk by Dan Johnson who showed his incredible package,
  Pinout. Laravel Pinout allows you to control hardware via a Laravel application and I knew as soon
  as the talk finished,…
---

At Laravel Live last year, I got to watch a talk by [Dan Johnson](https://danjohnson.xyz/) who showed his incredible package, Pinout. [Laravel Pinout](https://github.com/danjohnson95/pinout) allows you to control hardware via a Laravel application and I knew as soon as the talk finished, I'd have to try it out!

I ended up having Christmas off last year and needed a project to work on so it seemed like the perfect opportunity to get a breadboard, some LED displays a raspberry pi and lots of wires and tinker around with it!

It actually took a lot of effort to get working 😂 and I do plan on submitting a Pull Request with some changes to make to `libgpiod` so that Pinout supports the latest version of the drivers, but I was determined to push through so I had something!

Eventually, after spending most of Christmas Day and Boxing Day tinkering, I finally had an LED lit up that I could control via a Laravel Application!

> I finally managed to try Pinout by [@danjohnsonxyz](https://twitter.com/danjohnsonxyz?ref_src=twsrc%5Etfw)! Thanks to my folks for getting me a bunch of the needed equipment!  
>   
> I had to patch the libgpiod library so Pinout would work with the latest version, but it now works! 😍 Yes the wiring is messy 😂  
>   
> Time to look at other drivers! [pic.twitter.com/6ns9bFH1zG](https://t.co/6ns9bFH1zG)
> 
> — Jon Purvis (@JonPurvis\_) [December 26, 2025](https://twitter.com/JonPurvis_/status/2004687557028970887?ref_src=twsrc%5Etfw)

My wiring definitely needs improving as it's pretty messy! I also want to look into improving the speed between input and output as there's a noticeable delay. I'm unsure whether it's the changes I patched for `libgpiod`.

Overall, it was a fun package to play around with and I'm sure I'll come back to it later this year when I have some time! My only suggestion would be some documentation on wiring everything together. That's the bit I struggled with being a total newcomer to this.
