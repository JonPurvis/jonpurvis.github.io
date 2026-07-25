---
title: calebporzio/sushi
slug: calebporzio-sushi
date: 2022-01-22T15:28:53.000Z
updated: 2026-03-29T14:50:20.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1579871494447-9811cf80d66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fHN1c2hpfGVufDB8fHx8MTc3NDc5NTgxNXww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Vinicius Benedit
  profile_url: https://unsplash.com/@viniciusbenedit?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  On a project I've been working on recently at work, I needed a way of grabbing a list of
  "frequencies" in various places in my application, there's several ways I could've done this *
  Created a new database table,…
---

On a project I've been working on recently at work, I needed a way of grabbing a list of "frequencies" in various places in my application, there's several ways I could've done this

*   Created a new database table, stored them in there and then created a model to be able to query them. This would've meant that if any more entries needed adding, I'd either have to built functionality to be *able* to add them, OR add them directly in the database. This didn't seem like the right solution here.
*   I could've added them into a config file called `frequencies.php` and then referenced them in there. Whilst this solution didn't require database data fudging, it somehow didn't feel right either.
*   I could've hardcoded the same list in all the places I needed it to be, nope, definitely not this solution.

After some googling, I discovered the Sushi package by Caleb Porzio. If you're unaware of Caleb's work, he's responsible for things such as Livewire, AlpineJS and, well, Sushi.

Sushi is a way of utilising all of the Eloquent niceness, but not utilising a database. So if you have a really small and simple dataset, for example, a list of words, and storing them in a database seems overkill, Sushi can help you out.

After adding the package as a dependency in my application, I created a `Frequency` model and added the following to it:

```php
use Sushi;

protected array $rows = [
    ['value' => 'hourly', 'name' => 'Hourly'],
    ['value' => 'daily', 'name' => 'Daily'],
    ['value' => 'weekly', 'name' => 'Weekly'],
];
```

This is the same as having a database table called `frequencies` and storing 3 rows in that, each with a value and name. With this data, I can say with 99% certainty that it will never be edited, no other values will be stored and I don't need to tie it to any other date with foreign keys etc. Having this in a database is simply not necessary, but I still wanted to be able to treat the data as if it *was* in a database.

Using this solution, I can get a list of Frequencies that I can then pass into my view:

```php
Frequency::all()
```

I can then also hook it into my validation rules:

```php
$request->validate([
    'frequency' => 'required|string|in:'.Frequency::pluck('value')->join(','),
]);
```

For what I needed, this does the job perfectly. I can't say I'd use this solution *that* often but this was a rare occasion where it just didn't make any sense to store such a simple dataset in a database.
