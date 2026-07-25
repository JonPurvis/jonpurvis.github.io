---
title: Importing 1.7 billion rows of CSV data from Stripe with PHP
slug: importing-1-7-billion-rows-of-csv-data-from-stripe-with-php
date: 2025-01-26T17:12:52.000Z
updated: 2025-01-26T21:57:17.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1494412651409-8963ce7935a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fGltcG9ydHxlbnwwfHx8fDE3Mzc5MTEzODB8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: CHUTTERSNAP
  profile_url: https://unsplash.com/@chuttersnap?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  This post is inspired from a Tweet Christoph Rumpel put out earlier today and it got me thinking
  about the work I did last year to ensure one of our systems at work could handle massive files
  that we'd get from Stripe:…
---

This post is inspired from a Tweet [Christoph Rumpel](https://x.com/christophrumpel) put out earlier today and it got me thinking about the work I did last year to ensure one of our systems at work could handle massive files that we'd get from Stripe:

> What are your best practices for importing huge CSV files?
> 
> — Christoph Rumpel 🤠 (@christophrumpel) [January 26, 2025](https://twitter.com/christophrumpel/status/1883501912622026916?ref_src=twsrc%5Etfw)

One of our systems at work is a very big consumer of the Stripe API, in fact, there's stuff happening on that pretty much every single minute of the day. Part of that system uses Stripe's API to download files, loop through them and create/update models in the database.

This took some time to get right because just as I thought I'd got it working, a file far bigger than anything I'd had before would come through from Stripe and then I'd have to re-engineer parts of the code to prevent things such as timeouts from happening. These days, it can handle absolutely massive files, some of which are close to 4,000,000 rows of data and I suspect these files will keep getting bigger and bigger.

So how does it work?

Well, I'm first running a command to request a report from Stripe and then based on that response, storing data about it in our database, we really only need the File ID from Stripe, but I store a bunch of other bits of data too. I then run another command to actually process each report, which means taking the data stored already about the report and sending another request to Stripe but this time to get the contents of the file.

I'm using [SaloonPHP](https://docs.saloon.dev/) to make requests because this system does *a lot* with Stripe and I wanted some consistency between the requests. For this particular request though, I'm just passing in the File ID for the file we want the contents for, which is stored in the database when we first request the report from Stripe:

```php
$stripeFilesConnector = new StripeFilesConnector;

$response = $stripeFilesConnector->send(new GetFileContentsRequest(id: $reportToProcess->file_id));
```

Of course, I do error handling afterwards just incase there's a problem getting the data, but assuming it's worked, I then Stream the contents to a file on the local disk:

```php
 Storage::put($reportToProcess->file_id . '.csv', $response->stream()); 
```

This works very well, so that the file from Stripe then becomes a local file on the system which can then be used for the import. I'm using the `league/csv` package to do all of the heavy lifting.

There's numerous types of reports I request from Stripe, each report needs handling slightly differently so in my application I have various import classes and using the handy `switch` statement in PHP, I can switch which import is executed based on the type of the report it is, here's how it's done:

```php
switch ($reportToProcess->report_type) {
    case StripeReportTypeEnum::CardPaymentsFeesTransactionLevelTwo->value:
        (new CardPaymentFeesTransactionLevel2Import($reportToProcess, $csv))->import();
        break;
    case StripeReportTypeEnum::ActivityItemizedOne->value:
        (new ActivityItemized1Import($reportToProcess, $csv))->import();
        break;
    default:
    Log::error('No importer found for the report type ' . $reportToProcess->report_type);    
}
```

Each import class expects 2 things to be passed in:

*   **reportToProcess** which is the model from the database. We pass this in because we periodically update a *current\_row* flag which is useful for large imports to see where the import is up to.
*   **csv** which is is the file from Storage with the data from Stripe for the importer to then loop over and do what it needs to do.

The import classes are fairly straight forward. All they really do is loop through the records in the file we pass in and then either `updateOrCreate` a row in the database. There's some uniqueness between the imports though which is why they're split into separate classes. I preferred to do over it this way rather than having just one class littered with `if` statements. At a very basic level though, they all do this:

```php
foreach ($this->csv->getRecords() as $record) {
   $this->createModel($record);
   $this->setCurrentRow($currentRow++);
}
```

The import classes also handle things like notifications, so I know when a new import has started, errored and also when it's complete, how many rows it processed and how long it took to complete. Once it's imported, I can then delete the file on the local disk as there's no longer any need for it.

As for some extra details:

Streaming the data was the most effective solution I could find. The first solution of loading files within the command worked until we start getting bigger files, at which point, I was getting timeouts and memory limits on 99% of the imports that were running. I opted to instead stream the data to a locally stored file. This works wonderfully for massive files and as I mentioned earlier, these files may get even bigger.

Reports are processed in the command that's ran, rather than dispatching each one to a job. This is because we need the imports to complete in a certain order, so only one can run at a time. I may look in the future to dispatch a job to the queue to handle this import, but for now, it works fine.

As for speed, that largely depends on the type of import being ran. Some imports have a lot more data per row than others. For example, the **ActivityItemized1Import** class can run through 40,000 rows in about 15 seconds whereas the **CardPaymentFeesTransactionLevel2Import** is generally slower because the report has much more data. I haven't yet reached a point where speed becomes a problem though 🤞

For data validation, certain imports do check to see whether certain bits of data are in the row it's processing. There's been issues in the past with reports missing data and because that data is needed, there's no point continuing the import. If a row is missing some required data, we skip the row. This is fine for our use case as the row should appear in the next report of the same type anyway.

In the past year (slightly over), this code has so far read **1,792,349,350** rows in **~9000** reports from Stripe and there's no sign of it slowing down! Doing this was actually a very good learning exercise for me so thanks Stripe for your massive files! 😆
