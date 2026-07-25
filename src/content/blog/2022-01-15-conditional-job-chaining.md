---
title: Conditional Job Chaining
slug: conditional-job-chaining
date: 2022-01-15T13:08:15.000Z
updated: 2023-08-29T00:10:33.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1582693692339-3f6556e86f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fGNoYWlufGVufDB8fHx8MTY5MzE4NjU0OXww&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Matthew Lancaster
  profile_url: https://unsplash.com/@matthewelancaster?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  One of my recent projects at work had me working with jobs and job dispatching in Laravel, these
  are things I've used many times before however up until now, I've never had to deal with jobs that
  might not need to be…
---

One of my recent projects at work had me working with jobs and job dispatching in Laravel, these are things I've used many times before however up until now, I've never had to deal with jobs that *might* not need to be added to the chain before it's dispatched.

Now one way it could be done is to still dispatch each job, but have some logic in the job to determine whether it should actually do anything. If we take one of the jobs in my example snippet:

```php
/**
 * Execute the job.
 *
 * @return void
*/
public function handle()
{
    if (!$this->user->isHungry()) {
        return false;
    }

    // Carry on job as normal
}
```

By adding some logic to the top, we can check whether we need to actually process the job, or stop it before it actually does anything. I didn't really like this method though as it meant a job was still being chained and it was adding extra bloat to the `handle()` method for each job.

I started to search around and stumbled on the `[justiversen/laravel-job-chainer](https://github.com/justiversen/laravel-job-chainer)` package, which allows you to conditionally add jobs to a chain before you dispatch it, perfect! So if we take my chain in the snippet above, but use it with the package, we can do something like:

```php
$chain = new JobChainer();
$chain->add(GetAGlassOfYourFavouriteRum::class, $user);
if ($user->isHungry()) {
    $chain->add(GetSomeofYourFavouriteSnacks::class, $user);
}
$chain->add(WorkOutWhereTheTVRemoteIs::class, $user);
$chain->add(Relax::class, $user);
$chain->dispatch();
```

So this means the job chain will dispatch as normal, but if `$user->isHungry()` returns `false`, the `GetSomeofYourFavouriteSnacks()` job will not be included in the chain, as it's not needed.

This solved my problem perfectly and because there's not much going on under the hood, it was still a breeze to add tests for this functionality. It would be nice if Laravel 9 included this functionality so it's one extra dependency I have but for now, I'm happy with this solution.
