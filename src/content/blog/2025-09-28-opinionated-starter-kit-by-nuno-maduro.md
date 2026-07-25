---
title: Opinionated Starter Kit by Nuno Maduro
slug: opinionated-starter-kit-by-nuno-maduro
date: 2025-09-28T00:55:00.000Z
updated: 2026-06-15T00:56:01.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1672267273720-053bee27b9a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDE5fHxidWlsZGluZyUyMGJsb2Nrc3xlbnwwfHx8fDE3ODE0ODQ5NTR8MA&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Margarida Afonso
  profile_url: https://unsplash.com/@mrafonso1976?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Nuno Maduro recently dropped his own starter kit for Laravel applications recently so I took it
  for a spin! I largely agree with the direction of it, aside from one point which I'll get onto in
  a bit. If we take a look…
---

Nuno Maduro recently dropped his own starter kit for Laravel applications recently so I took it for a spin! I largely agree with the direction of it, aside from one point which I'll get onto in a bit.

If we take a look at the [repo](https://github.com/nunomaduro/laravel-starter-kit), you'll see it comes with:

*   **100% Type Coverage**: Every method, property, and parameter is explicitly typed
*   **Zero Tolerance for Code Smells**: Rector and PHPStan at maximum strictness catch issues before they become bugs
*   **Immutable-First Architecture**: Data structures favor immutability to prevent unexpected mutations
*   **Fail-Fast Philosophy**: Errors are caught at compile-time, not runtime
*   **Automated Code Quality**: Pre-configured tools ensure consistent, pristine code across your entire team
*   **Bun-Powered**: Leveraging Bun for blazing-fast dependency management...
*   **Just Better Laravel Defaults**: Thanks to [**Essentials**](https://github.com/nunomaduro/essentials) / strict models, auto eager loading, immutable dates, and more...

*One thing that isn't mentioned above is the enforcement of 100% code coverage too.*

* * *

The only parts I don't fully agree with is the ***Zero Tolerance for Code Smells***. Having worked with (and love) PHPStan for several years now, sometimes the higher levels feels like fighting with the codebase just for the sake of it. If I was building a starter kit, I probably would've keep it around level 5-6.

I also don't fully agree with 100% code coverage. I try and maintain 90% code coverage, to get to 100% sometimes has you writing tests just for the sake of it. Code Coverage is an odd one in that depending on how you look at it, it's largely meaningless. You could write 1 test, that hits your whole application but actually tests nothing and you get 100% code coverage. I would enforce 90% but also add in mutation testing too. I believe mutation testing is more valuable.

* * *

I love how Nuno has embraced composer scripts, to make running commands easier, for example:

*   `composer test:type-coverage` - Ensures 100% type coverage with Pest
*   `composer test:types` - Runs PHPStan at level 9 (maximum strictness)
*   `composer test:unit` - Runs Pest tests with 100% code coverage requirement
*   `composer test` - Runs the complete test suite (type coverage, unit tests, linting, static analysis)

* * *

Overall, I believe this is a solid foundation to get started building a Laravel application. It uses modern tooling and enforces a lot of best practices.
