---
title: The State of PHP 2025
slug: the-state-of-php-2025
date: 2025-11-02T18:44:00.000Z
updated: 2026-06-13T17:44:34.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDMyfHxhbmFseXNpc3xlbnwwfHx8fDE3ODEzNzI2NTR8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Maxim Hopman
  profile_url: https://unsplash.com/@nampoh?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Every year, Jetbrains run a survey called The State of PHP and it's a way to collect information,
  from all around the world, about how PHP is getting used. I look forward to this every year as I
  find the data…
---

Every year, Jetbrains run a survey called *The State of PHP* and it's a way to collect information, from all around the world, about how PHP is getting used. I look forward to this every year as I find the data fascinating to go through! [Jetbrains do their own writeup of the results on their blog](https://blog.jetbrains.com/phpstorm/2025/10/state-of-php-2025/), but I figured I'd do a post to do a little comparison between 2024 and 2025!

## Number of Participants

The number of participants this year actually dropped quite a lot from 2024. In 2024, 2,600 developers responded however this year, only 1,720 responses were created. That said, I'm not sure if there's a difference between the number of responses submitted and the number of responses analysed. The terminology between the 2 years is different.

## Geographic Distribution

There wasn't much of a difference between the geographic distribution between the 2 years. Japan remained on top, then followed by America, Russia and China. In 2024, Russia wasn't mentioned at all. Brazil saw a big drop from 7% to 3%, although that could be attributed to the lower number of responses this year.

## Professional Experience

The brackets in this response remained *almost* exactly the same. 6-10 years was still the most selected bracket. Everything else remained in the same order except 11-15 years and 3-5 years. The former is now more popular.

## PHP Versions

Always one of the highlights is to see the versions of PHP being used. As you'd expect, PHP 8.x usage continued to climb, from 86% to 89%. PHP 7.x usage dropped from 44% right down to 33% and for the first time ever, PHP 5.x (or lower) usage dropped into single digits, from 12% to 8%.

I always enjoy looking at this shift as it shows PHP folks are heading in the correct direction.

## Frameworks

It's probably no surprise that the top 3 didn't change, in-fact, the top 5; Laravel, WordPress, Symfony, CodeIgniter and Yii remained in the same order. Both CodeIgnitor and Yii saw a rise in 2024 from 2023, but this year they've dropped back down. Laravel saw the biggest rise of 3%, Wordpress and Symfony increased by 2%.

I'm interested to see if the AI work Laravel have been doing recently with things like `laravel/boost` contribute a meaningful increase next year as it definitely makes the Framework more open and accessible.

## IDEs

I think over the next couple of years, the answers for this question are going to change drastically. This year though, PHPStorm remained on top closely followed by VS Code. What's interesting though is whilst PHPStorm increased from 58% to 68%, VS Code dropped from 35% and 23%. We also see the introduction of AI focused IDEs, with Cursor attributed to 6% of responses.

## Debugging

This section is another section I think will change significantly with the rise of AI. I think usage of debuggers and even usage of things like `dd` and `dump` will start to decrease in favour of just getting AI to debug for you.

For this year, Debuggers actually saw a rise from 33% to 39% whereas using functions such as `dd` and `dump` took a dip from 64% to 59%.

## Testing Frameworks

This one always has me worried, because it highlights how many folks *still* don't write tests for their PHP code. I can't think of a single reason, other than laziness for why you wouldn't write any.

As you would expect, PHPUnit remained on top, with 50% of responders using it, which means no change from 2024. Worryingly second, (but the same as last year) was "I don't write tests for PHP", whilst it did drop from 36% to 32%, it's still way too high for my liking.

PestPHP got a nice little boost and whilst it remained in 3rd place, 17% of responders said they use it, whereas it was only 13% last year. I think PestPHP simply has a better marketing strategy than PHPUnit, so I wouldn't be surprised for this number to keep growing.

## Code Quality Tools

The top 3 of these remained the same however PHPStan over took PHP CS Fixer and now sits on top. PHPStan grew from 27% to 36% whereas PHP CS Fixer only grew by 2%. PHP\_CodeSniffer increased by 1% and remains in 3rd place.

RectorPHP grew by 2% this time round, and I think it's going to keep growing. It's constantly getting new rules added to it so I'm expecting this number to be even higher next year. I don't think it'll reach 3rd place, but it may take over Php Inspections.

## AI Adoption

AI Tools saw a bit of a shift. Whilst ChatGPT and GitHub Copilot both remaining in the top 2, both are used a lot less regularly. Cursor overtook Google Gemini for 3rd place whilst the latter slipped right down to 3rd place. JetBrains AI assistant remained in 4th place.

* * *

That's the end of my comparison! I had fun going through all of the results. There were definitely some surprises. My biggest surprise is the fact that 32% of people *still* don't write tests for their code. I expected with the rise of AI, for this number to be a lot lower, because AI is pretty good at writing tests!

* * *

I'll be sure to do a comparison article when the results are out for 2026 and will compare against 2025!
