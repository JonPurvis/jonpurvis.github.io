---
title: Ghost Finally has Native Search
slug: ghost-now-has-native-search
date: 2022-07-17T22:11:33.000Z
updated: 2023-08-29T00:09:44.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1619884889432-b242fdee532a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDZ8fHNlYXJjaHxlbnwwfHx8fDE2OTMxODU1NDJ8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Daniel Lerman
  profile_url: https://unsplash.com/@dlerman6?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  July 12th 2022, was a glorious day for any fans of Ghost because after what feels like a lifetime,
  Ghost finally launched Search functionality native to the platform. Search has been the most
  requested Ghost feature…
---

July 12th 2022, was a glorious day for any fans of Ghost because after what feels like a lifetime, Ghost finally launched Search functionality native to the platform.

Search has been the most requested Ghost feature since, well, forever! Folk in the past have come up with solutions to get search functionality into Ghost, including the rather popular [GhostHunter](https://github.com/jamwise/ghostHunter) plugin. But that's the problem; it's a Plugin, which as the maintainer of a site, requires you do to the work to get it working on your website. If it doesn't work? You're kind of left to your own devices to figure out why it's not working, which, if you're not tech-savvy, you might as well look elsewhere!

Native Search in Ghost came in the 5.3.0 release and required no additional work to get it functioning; it's working on this site! Click the Search icon in the header OR click `cmd` + `k` as a handy shortcut to open the search window!  
The window is very clean and minimalist, as you can see in the feature image of this post. You can currently search Posts, Tags and Authors and the results update as you type. This implementation is precisely how I expected the search functionality to work in Ghost, no actual setup, easy to use, and above all else, fast! 🔥

To achieve this blazing fast speed, blog posts are stored in an index; whenever a query is made, the index is searched to return relevant results to the user. To keep the index running fast, only 10,000 posts are stored in the index. For 99.99% of sites, this won't be a problem; 10,000 posts is a lot of content!

To combat this limitation, Ghost are working on making it possible to switch out indexing to a more sophisticated indexer to something like [Algolia](https://www.algolia.com/) for websites that need extra indexing power. I think Ghost's native indexer should be fine for most sites!

I'm pleased about Ghost adding Search natively; it's not something I've actively sought out for this website, mainly because there's still a small number of posts you can search for manually, but having it on the website is pretty great. This is a significant win for Ghost, and I'm excited to see future iterations of their Search functionality!

Get searching!
