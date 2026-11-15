---
title: Using the Monzo SDK in my personal finance app
slug: using-the-monzo-sdk-in-my-personal-finance-app
date: 2026-11-15T16:00:00.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1585143790814-b40d4b829e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000
feature_image_credit:
  name: Napendra Singh
  profile_url: https://unsplash.com/@napender?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/photos/clear-glass-jar-with-coins-XmvQveCDsQI?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I've wired the Monzo SDK into my personal finance app. It shows me the pots,
  runs a 4p challenge every night, and next I want a Gaming pot that gets
  £1 for every 10 gamerscore I unlock.
---

Last week I wrote about [building a Monzo SDK with Saloon](/building-a-monzo-sdk-with-saloon/). This one's about using it. I've got a personal finance app, and the SDK is how it talks to Monzo. It does two things: it shows me the pots, and it moves money between them.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/JonPurvis/monzo-php-sdk" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">JonPurvis/monzo-php-sdk</div>
<div class="bookmark-card-description">Framework-agnostic Monzo developer API SDK, built with Saloon v4.</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/JonPurvis/monzo-php-sdk" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

## Pot Viewing & Data Collection

Twice a day, at 01:00 and 13:00, the app goes and fetches them.

```php
$accounts = $client->accounts()->list()->throw()->json('accounts');

$pots = $client->pots()->list($accountId)->throw()->json('pots');
```

I get the name, the balance in pence, when it was opened, and the cover image. That's the savings page. The balance is whatever Monzo says it is, so I don't have to type it in.

I keep an interest rate on the row. The page does balance times rate, divided by twelve, and that's my guess at the month's interest. It's not a fortune, but I like seeing it. The dashboard adds the balances up, and once the numbers are stored I graph them: balance over time, what's gone in, what's come out. Handy when I want to look back at a pot instead of just seeing what it's at today. If I've tied a goal to a pot then the goal moves when the pot does, which is much better than a progress bar I have to nudge myself.

Monzo's `updated` on the pot is the last time the pot itself changed: a rename, a new cover image, that sort of thing. I wanted the last activity, the last time money actually moved. So I page through transactions with the scheme `uk_retail_pot`, pull the pot id out of the metadata, and keep the latest `created` time. That's the Updated column. If a pot has gone, it comes off the page. If the call fails, yesterday's numbers stay. I'd rather that than a blank page.

## Money Movement

There's another task, and this one runs at midnight. This is the fun part.

A payment can put money into a pot, take it out, or move it from one pot to another. In is `pots()->deposit()` from the current account. Out is `pots()->withdraw()`. Pot to pot is both, because Monzo will only move a pot against your current account. So you withdraw into the current account, then deposit into the other one. A bit fiddly. Two calls and it's done.

```php
$client->pots()->withdraw(
    potId: $fromPotId,
    amount: $amountPence,
    destinationAccountId: $accountId,
    dedupeId: $dedupeId.'-out',
);

$client->pots()->deposit(
    potId: $toPotId,
    amount: $amountPence,
    sourceAccountId: $accountId,
    dedupeId: $dedupeId.'-in',
);
```

The one that runs every day is a 4p challenge. Day 1 is 4 pence, day 2 is 8 pence, day *n* is *n* × 4. Day 100 is £4. Day 365 is £14.60. Do the whole year and it's £2,671.80, which is pretty good going for something that starts at 4p.

All of that sits in a savings pot, because the pot pays interest and I want as much of it in there as I can. Every night the app works out today's amount and moves just that to the current account. On day 100 it's only taken £202, so there's still £2,469.80 sat there earning. Over the year about two thirds of it is still in the pot on a typical morning, since the early days are tiny and the big ones turn up at the end. I don't have to remember. Midnight comes round and it's done.

```php
$dayNumber = (int) $startsOn->diff($today)->format('%a') + 1;

$client->pots()->withdraw(
    potId: $potId,
    amount: $dayNumber * 4,
    destinationAccountId: $accountId,
    dedupeId: $dedupeId,
);
```

The `dedupe_id` is the payment and the date, same idea as the last post. If the task runs twice, Monzo has already seen that id and it won't take the money twice. I'd rather be safe there.

## Next Experiment

The scheduled stuff is great, but I want to see what fun things I can do with money movement.

The one I keep coming back to is a Gaming pot, paid by achievements. Unlock something worth 10 gamerscore and £1 goes in. 50 gamerscore is a fiver. The hope is I'll actually finish games if there's money in it, and then the pot is sat there when I want to buy the next one.

```php
$client->pots()->deposit(
    potId: $gamingPotId,
    amount: $gamerscore * 10,
    sourceAccountId: $accountId,
    dedupeId: 'xbox-'.$achievementId,
);
```

The amount is in pence, so 10 gamerscore is 100 pence. The `dedupe_id` is the achievement, so the same unlock coming through twice doesn't pay me twice. A 1000 gamerscore completion is £100, which is a new game and then some. That's the idea. Finish stuff, and the next one pays for itself.

I also want better error handling. If a sync fails, or a midnight payment doesn't go through, email me. I'd rather get that the same day than notice a week later because a balance looks wrong.
