---
title: How OctocatBot Works
slug: how-octocatbot-works
date: 2021-12-31T00:01:00.000Z
updated: 2023-08-29T00:11:32.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDh8fHBocHxlbnwwfHx8fDE2OTMxODc0OTN8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Luca Bravo
  profile_url: https://unsplash.com/@lucabravo?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  OctocatBot is one of the handful of Twitter bots I've built and like the other bots, it serves no
  real value and was only created out of curiosity and boredom! The idea behind the Bot is simple.
  Github operate…
---

[OctocatBot](https://twitter.com/OctocatBot) is one of the handful of Twitter bots I've built and like the other bots, it serves no real value and was only created out of curiosity and boredom!

The idea behind the Bot is simple. Github operate [myoctocat.com](https://myoctocat.com/) which allows anyone to create their own version of the Github mascot. You then have the option of sharing it to websites such as Twitter and Facebook.

My bot picks any up that have been shared to Twitter, downloads and stores the image and then sends a Tweet containing the image for the world to see!

<aside class="callout callout-info">
<strong>Note</strong>
<p>It's worth me pointing out that this was created in the space of 1 evening, the code is far from perfect and there's a million ways it can be optimised 😂</p>
</aside>

Like pretty much all of my projects, it's on a $6 [Digital Ocean](https://www.digitalocean.com/?refcode=a8f18e340e75&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge) droplet, although I think it was $5 when I originally purchased it as I've had it for a while and just repurpose it when needed.

It utilises [Composer](https://getcomposer.org/) for package management and it relies on a total of 1 package:

```json
{
    "require": {
        "abraham/twitteroauth": "^2.0"
    }
}
```

composer.json contents

The heavy lifting of the bot is done using 2 pretty small scripts. Let's look at `interact.php` first. All this script does is looks for a tweets containing hashtags for *github* and *octocat* and then likes the tweet and follows the user, this is done like:

```php
$tweet = $connection->get("search/tweets", ["q" => "#github #octocat -from:OctocatBot -filter:retweets", 'count' => 1])->statuses[0];

$connection->post("favorites/create", ["id" => $tweet->id]);
$connection->post("friendships/create", ["screen_name" => $tweet->user->screen_name]);
```

I'm also adding `-from:OctocatBot -filter:retweets` to the query because I don't want my own Tweets from being picked up, I also don't want any retweeted tweets picked up, originals only.

This script is then set up as a cron job to run every 10 minutes. I played with a bunch of different times but honestly, tweets containing hashtags for *github* and *octocat* bot aren't that common to require the script running any more frequently.

This went slightly outside the scope of what the bot was *meant* to do, but I was having fun and figured I'd add some more functionality to it.

The other script is `tweet.php`. This is the script that finds Octocats, stores them and then tweets about them. Ideally, this script would be split slightly as I think it does too much. Much like the previous script, this also runs as a cron job but every 6 hours. I think 4 Octocat posts a day is enough!

The first thing the script does is checks Twitter for any recent posts that are of interest to us:

```php
$connection->get("search/tweets", ["q" => "#myoctocat is out of the bag…", 'count' => 100]);
```

Finding relevant Tweets

The query searches for the default string provided by [myoctocat.com](myoctocat.com), it does mean if someone changes it before they share it, my bot won't pick it up but that's okay. We're also limiting it to 100 tweets, however it usually only gets 1-3 at a time anyway, depending on any shares that have happened since the cron last ran.

We then loop through each Tweet, and check if it has any media, then loop through the media and store a file on the server

```php
foreach ($tweets->statuses as $tweet) {
  if (!empty($tweet->extended_entities)) {
    foreach ($tweet->extended_entities->media as $octocat) {
      copy($octocat->media_url, 'octocats/'.str_replace('http://pbs.twimg.com/media/', '', $octocat->media_url));
    }
  }
}
```

This then stores a file such as `EyY6zYxXdeawEAUBssZ.jpeg`, so you have no idea what account the image is from.

We then pick a random image to use for the Tweet. This is done by first uploading the media to Twitter, and then using the ID that is returned to attach the media to the Tweet

```php
$octocat = $connection->upload('media/upload', ['media' => array_rand(array_flip(glob('octocats/*')), 1)]);
```

Uploading a media item to Twitter

We can then then set the actual status of the Tweet and link the recently uploaded media item to the Tweet we're going to post:

```php
$tweet_prefixes = [
  'I\'ve found a',
  'There\'s a',
  'I\'ve stumbled across a',
  'I\'ve discovered a',
];

$result = $connection->post('statuses/update', [
  'status' => array_rand(array_flip($tweet_prefixes), 1).' new Octocat in the Twitterverse! #Github #Octocat',
  'media_ids' => $octocat->media_id_string,
]);
```

The `$tweet_prefixes` array is purely to give the tweets a bit more randomness. You can also see how we're using `$octocat->media_id_string` to attach the media to the Tweet, rather than uploading media *with* the Tweet.

The Tweet then posts to Twitter and looks something like:

> I've stumbled across a new Octocat in the Twitterverse! [#Github](https://twitter.com/hashtag/Github?src=hash&ref_src=twsrc%5Etfw) [#Octocat](https://twitter.com/hashtag/Octocat?src=hash&ref_src=twsrc%5Etfw) [pic.twitter.com/WjkhWiobSp](https://t.co/WjkhWiobSp)
> 
> — OctocatBot (@OctocatBot) [December 30, 2021](https://twitter.com/OctocatBot/status/1476432874001907713?ref_src=twsrc%5Etfw)

The selected image is then deleted from the server as once it's Tweeted, we have no use for it anymore

* * *

That's how OctocatBot works. As I said at the start, it was a quick evening project and no time was spent making it work elegantly or efficiently. If I ever release the source code to Github I probably will refactor the code.

If you haven't already, you should create you own Octocat!

[Create your own Octocat](https://myoctocat.com/)
