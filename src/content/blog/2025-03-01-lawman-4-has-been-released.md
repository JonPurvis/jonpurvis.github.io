---
title: Lawman 4 has been released
slug: lawman-4-has-been-released
date: 2025-03-01T15:36:14.000Z
updated: 2026-03-29T13:01:55.000Z
tags:
  - packages
  - development
  - saloonphp
feature_image: >-
  https://images.unsplash.com/photo-1560840881-4bbcd415a9ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE5fHxzYWxvb258ZW58MHx8fHwxNzc0Nzg5MzAyfDA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Bernd Bangert
  profile_url: https://unsplash.com/@beban?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  It's been a while since I've made any updates to Lawman but I've had an open issue lingering for
  quite some time (one I opened myself) for making the testing of properties a bit better, so this
  afternoon I decided to…
---

It's been a while since I've made any updates to [Lawman](https://github.com/JonPurvis/lawman) but I've had an open issue lingering for quite some time (one I opened myself) for making the testing of properties a bit better, so this afternoon I decided to tackle it!

Let's say you have a Connector which connects to an API, but the API is known for being a bit flakey and it can sometimes take a bit of time to actually connect to it, in your Connector class, you may define the following:

```php
protected int $connectTimeout = 60;
```

This means that any requests that use this connector, have a time out of 60 seconds. Now, previously with Lawman you could write a test like the one below which would validate your Connector has a timeout:

```php
test('connector')
    ->expect('App\Http\Integrations\Integration\Connector')
    ->toSetConnectTimeout()
```

All this would do though is check to see whether the `connectTimeout` property existed on the class, it could be set to anything. I thought this was a bit weak because someone could edit the Connector, not realise that the API is flakey and thus needs to be 60 seconds and change it to 20 seconds instead. If you've got your tests in a CI/CD pipeline, then the tests will still pass and the change will be deployed and then all of a sudden, you start getting connection timeouts.

So to combat this, I've updated that Expectation so you can pass in a value as to what it should be, that test above then becomes:

```php
test('connector')
    ->expect('App\Http\Integrations\Integration\Connector')
    ->toSetConnectTimeout(connectTimeout: 60)
```

This means that if someone changes it to 20 seconds, the test will now fail and the change won't be deployed. Thus, saving you the headache of having to then go back in, increase the timeout and redeploy.

This change has been made on the following Expectations:

*   toSetConnectTimeout (default 10)
*   toSetRequestTimeout (default 30)
*   toBeTriedAgainOnFailure (default 3)
*   toHaveRetryInterval (default 500)

The default value for each of these was taken from the [SaloonPHP](https://docs.saloon.dev/) documentation.

This change did require a new major release, because if you're using these Expectations and not using the default values, your tests will fail. You will need to add the parameter in wherever you're using them.

Enjoy! 🤠
