---
title: Testing Backed Enums with PestPHP
slug: testing-backed-enums-with-pestphp
date: 2024-02-04T22:25:07.000Z
updated: 2024-08-04T12:43:22.000Z
tags:
  - development
  - pestphp
feature_image: >-
  https://images.unsplash.com/photo-1581472723648-909f4851d4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDI5fHxkZXZlbG9wbWVudHxlbnwwfHx8fDE3MDcwODU0OTJ8MA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Joshua Reddekopp
  profile_url: https://unsplash.com/@joshuaryanphoto?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  PestPHP has had the toBeEnum() Expectation for a while now and is great to ensure your Enums are,
  well, Enums. I wanted to take this Expectation one step further though and introduce a way of
  checking that Enums are…
---

[PestPHP](https://pestphp.com/) has had the `toBeEnum()` Expectation for a while now and is great to ensure your Enums are, well, Enums.

I wanted to take this Expectation one step further though and introduce a way of checking that Enums are either `string` backed or `int` backed. Introducing 2 new Expectations for you to use:

*   `toBeStringBackedEnum()`
*   `toBeIntBackedEnum()`

I was working on a project at work that uses a handful of Enums, some `int` backed and some `string` backed. I wanted to strenghten the testing of these by testing the backing type, not just whether they are Enums.

The code behind these Expectations is actually pretty simple:

```php
    /**
     * Asserts that the given expectation target is a backed enum of given type.
     */
    private function toBeBackedEnum(string $backingType): ArchExpectation
    {
        return Targeted::make(
            $this,
            fn (ObjectDescription $object): bool => (new \ReflectionEnum($object->name))->isBacked()
                && (string)(new \ReflectionEnum($object->name))->getBackingType() === $backingType,
            'to be ' . $backingType . ' backed enum',
            FileLineFinder::where(fn (string $line): bool => str_contains($line, 'class')),
        );
    }
```

Reflection has some handy methods to make this an absolute breeze. We obviously need to check whether they are backed by *something*, so for this we can use the `isBacked()` method. We then need to determine whether it's backed by what we expect it to be. For this, we can use `getBackingType()` and then compare that against the type we pass into the method, simple!

I then added a couple more method to actually be used in your tests:

```php
    /**
     * Asserts that the given expectation targets are string backed enums.
     */
    public function toBeStringBackedEnums(): ArchExpectation
    {
        return $this->toBeStringBackedEnum();
    }

    /**
     * Asserts that the given expectation targets are int backed enums.
     */
    public function toBeIntBackedEnums(): ArchExpectation
    {
        return $this->toBeIntBackedEnum();
    }

    /**
     * Asserts that the given expectation target is a string backed enum.
     */
    public function toBeStringBackedEnum(): ArchExpectation
    {
        return $this->toBeBackedEnum('string');
    }

    /**
     * Asserts that the given expectation target is an int backed enum.
     */
    public function toBeIntBackedEnum(): ArchExpectation
    {
        return $this->toBeBackedEnum('int');
    }
```

In a test, it would look something like:

```php
test('enums are backed by string')
    ->expect('app\Enums')
    ->toBeStringBackedEnums();
```

If your Enums are backed, I would highly recommend using these Expectations over the `toBeEnum()` Expectation. This will allow you to catch failures if someone makes a change to the class by, for example, changing the backing type for some random reason!

I actually did the work for this back in November but it took a little bit of time to get released. This change was included in [Pest v2.33](https://github.com/pestphp/pest/releases/tag/v2.33.0) and you can view the individual [Pull Request on GitHub](https://github.com/pestphp/pest/pull/1006).

PestPHP is one of my favourite tools that I get to use pretty much every day and I love contributing ideas I have to strengthen it!
