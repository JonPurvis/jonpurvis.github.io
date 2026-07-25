---
title: A tip for dealing with Google API's
slug: a-tip-for-dealing-with-google-apis
date: 2025-02-09T02:30:00.000Z
updated: 2025-02-16T02:30:43.000Z
tags:
  - development
  - saloonphp
feature_image: >-
  https://images.unsplash.com/photo-1670645948617-f06d0d4a92d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE5fHxzeXN0ZW0lMjBlcnJvcnxlbnwwfHx8fDE3Mzk2NzMwMTN8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Cecep Rahmat
  profile_url: https://unsplash.com/@cecepr?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  The SaaS I'm helping build does a lot with Google API's. In fact, it currently works with 5
  different APIs and ~15 endpoints. One of the issues that kept cropping up was us getting a 503
  Service Unavailable response,…
---

The SaaS I'm helping build does a lot with Google API's. In fact, it currently works with 5 different APIs and ~15 endpoints. One of the issues that kept cropping up was us getting a 503 Service Unavailable response, more times than not. The timing wasn't consistent, it could happen on any request at any time.

We're using [SaloonPHP](https://docs.saloon.dev/) to integrate with Google, which means all of the requests go through a Connector class, or in our case, one of 5 Connector classes. The beauty of the Connector class is that you can add logic into it, which will be used for any Request that goes through it.

So with this in mind, I edited all of the Connector classes to have 3 properties, let's take a look at the Connector that handles any Requests to the Google Maps API:

```php
<?php

namespace App\Integrations\Google;

use Saloon\Http\Connector;
use Saloon\Traits\Plugins\AcceptsJson;

class MapsConnector extends Connector
{
    use AcceptsJson;

    public ?int $tries = 3;

    public ?int $retryInterval = 500;

    public ?bool $useExponentialBackoff = true;

    /**
     * The Base URL of the API
     */
    #[\Override]
    public function resolveBaseUrl(): string
    {
        return 'https://maps.googleapis.com/maps/api/';
    }
}
```

So each time we interact with a Google API, we:

*   Try the job 3 times, if it still doesn't work, then we class it as failed
*   Use Exponential Backoff, to give more time between each retry, based on the interval we set
    *   1st retry happens 500ms after the initial request
    *   2nd retry happens 1s after the 1st retry

And that's it! I can't remember the last time I saw a Google 503 response, but it was getting quite annoying seeing all of those failures coming through!
