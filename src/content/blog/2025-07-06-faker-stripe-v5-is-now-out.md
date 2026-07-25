---
title: Faker Stripe V5 is now out
slug: faker-stripe-v5-is-now-out
date: 2025-07-06T01:18:00.000Z
updated: 2026-05-04T01:18:23.000Z
tags:
  - development
  - packages
feature_image: >-
  https://images.unsplash.com/photo-1621659958625-118bff31adcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDM0fHxjbG93bnxlbnwwfHx8fDE3Nzc4NTc0NzF8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Nick Fewings
  profile_url: https://unsplash.com/@jannerboy62?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I'm happy to announce that V5 of Faker Stripe has been released! I love working on this package
  because whilst it may be simple, it's proved its use over the years when working with the Stripe
  API! It was also one of my…
---

I'm happy to announce that V5 of Faker Stripe has been released! I love working on this package because whilst it may be simple, it's proved its use over the years when working with the Stripe API! It was also one of my first foray into Open Source, so it'll always hold a special place in my heart!

So what's new?

*   Minimum PHP version is now 8.3
*   Removed
    *   `stripeBillingUsageRecordId`
    *   `stripeBillingUsageRecordSummaryId`
*   Added
    *   `stripeFinancingOfferId()`
    *   `stripeCoreFxQuoteId()`
    *   `stripeBillingMeterAdjustmentId()`
    *   `stripeSigmaQueryId()`
    *   `stripePrivacyRedactionJobId()`
    *   `stripePrivacyRedactionJobValidationErrorId()`
    *   `stripeBillingInvoicePaymentId()`
    *   `stripeExternalAccountCardId()`
    *   `stripeTaxRegistrationId()`
*   Various `README.md` updates to make it easier to read

* * *

Due to the minimum PHP version bump, this required a new major version as it is a breaking change. I'd recommend you update consuming applications to PHP83.
