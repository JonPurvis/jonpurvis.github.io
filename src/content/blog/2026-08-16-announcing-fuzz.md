---
title: Announcing Fuzz
slug: announcing-fuzz
date: 2026-08-16T17:00:00.000Z
tags:
  - development
  - pestphp
  - packages
  - ai
feature_image: >-
  https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000
feature_image_credit:
  name: Markus Spiske
  profile_url: https://unsplash.com/@markusspiske?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I've been on a security drive at work, so I built Fuzz: coverage-guided fuzz testing for
  PestPHP, so hostile-input tests can live alongside your normal app tests. Announcing v1.
---

I've been on a bit of a security drive recently at work. Looking into some of the issues we've been digging into, it struck me that a few of them could have benefited from fuzz testing: throwing weird, hostile inputs at parsers and helpers until something falls over.

So I decided to build a fuzz tester that fits into the [PestPHP](https://pestphp.com/) ecosystem. I wanted fuzz tests to live alongside regular app tests, written in the Pest style we already know and love, not stuck in a separate CLI world you only remember about once a year.

I'm pleased to announce **Fuzz** (`jonpurvis/fuzz`) v1: coverage-guided fuzzing for Pest, powered by [nikic/php-fuzzer](https://github.com/nikic/PHP-Fuzzer). You drop `fuzz(...)->run()` inside a normal `test()`, and Pest runs it with the rest of your suite. Under the hood, the fuzzer is steered by which lines of your code each input actually runs. Meaning: if a mutated input only revisits the same happy-path lines the seed already hit, it gets discarded; if it suddenly takes a different `if` / null / error path, that input is kept and mutated further. That is what "coverage-guided" is.

## How it came together

I started this on the train to Manchester on Wednesday. I used AI to come up with a solid plan I could actually read and tweak on the journey, then had it execute the plan. Honestly, I needed to get involved very little. The interesting work was deciding what "Pest-native fuzzing" should feel like, then letting the implementation follow that plan.

## Datasets vs fuzz

If you already use Pest [datasets](https://pestphp.com/docs/datasets), you might wonder whether you need this at all. Short answer: they solve different problems, and both have their place.

**Datasets** confirm behaviour on inputs you already thought of. You list the rows, Pest runs them, you get a clear pass or fail per case. Brilliant for named regressions and happy paths.

**Fuzz** searches. You give it a few seeds, optionally a dictionary of useful fragments, and a budget of runs. It mutates those inputs and hunts for crashes you never listed: `TypeError`s, timeouts, leaky sanitizers, hostile JSON shapes, and the like.

In practice that search looks like this:

1. Start from your seeds.
2. Mutate those bytes (flip/delete/insert, splice in dictionary tokens).
3. Watch which lines of your PHP ran for that input (coverage).
4. If the input hit something new, keep it and mutate it further. If it only revisited the same lines as before, throw it away.
5. Fail the Pest test if the target throws an uncaught `Error` / `TypeError` / times out, and (by default) save the payload under `.pest/fuzz-crashes/`.

That loop is what **coverage-guided** means. Imagine your seed only walks the happy path. A mutation that still only walks that path teaches the fuzzer nothing, so it moves on. A mutation that suddenly takes a different `if` / `switch` / error branch is interesting: the fuzzer keeps that input and breeds more variants from it. Over thousands of runs, that pushes the search toward the weird shapes that actually stress your code, instead of wasting the budget on noise that never leaves the happy path.

Use both. Datasets lock in the past. Fuzz hunts the future. When fuzz finds a crash, paste that payload into a dataset so it never slips back in.

## How you'd use it

Say your app handles webhook JSON and trusts the decoded payload a little too much:

```php
namespace App\Webhooks;

final class PayloadParser
{
    public static function eventName(string $json): string
    {
        $data = json_decode($json, true);

        // Assumes an object with a string "event"
        return $data['event'];
    }
}
```

A dataset can lock in the cases you care about by name. Fuzz is there for everything else: `{"event":null}`, missing keys, arrays where you expected strings, truncated JSON, and so on.

```php
use function Fuzz\fuzz;

test('webhook parser never fatals on hostile JSON', function (): void {
    fuzz(Closure::fromCallable([PayloadParser::class, 'eventName']))
        ->seed([
            '{"event":"checkout.session.completed"}',
            '{"event":"invoice.paid","id":"in_123"}',
        ])
        ->withDictionary(['{', '}', '[', ']', 'null', 'event', ':', ','])
        ->runs(2000)
        ->maxLen(64)
        ->saveCrashes()
        ->run();
});
```

Prefer static callables (or `Closure::fromCallable`) so the isolated worker stays happy. If something crashes, Pest fails the test and, by default, saves the payload under `.pest/fuzz-crashes/` so you can replay it or promote it into a dataset.

Why bother? Because production traffic (and attackers) invent cases your happy-path tests never walk. Catching a `TypeError` in CI is a lot nicer than catching it in an error tracker at 2am.

## Get started

You can find the repo below. Contributions are welcome: open an issue or a PR if you spot something.

<figure class="bookmark-card">
<a class="bookmark-card-link" href="https://github.com/JonPurvis/fuzz" target="_blank" rel="noopener noreferrer">
<div class="bookmark-card-content">
<div class="bookmark-card-title">GitHub - JonPurvis/fuzz: 👾 A PestPHP Plugin for Coverage-Guided Fuzz Testing.</div>
<div class="bookmark-card-description">👾 A PestPHP Plugin for Coverage-Guided Fuzz Testing. - JonPurvis/fuzz</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="https://github.githubassets.com/favicons/favicon.svg" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">GitHub</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://opengraph.githubassets.com/1/JonPurvis/fuzz" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

Requires PHP 8.4+ and Pest 5:

```bash
composer require jonpurvis/fuzz --dev
```

I hope it comes in useful on your projects. If you try it, I'd love to hear how you get on.
