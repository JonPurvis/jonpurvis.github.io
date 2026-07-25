---
title: Laravel MCP Beta
slug: laravel-mcp-beta
date: 2025-09-21T00:45:00.000Z
updated: 2026-06-15T00:46:17.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1706596922260-cea689959f78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDEwfHxiZXRhfGVufDB8fHx8MTc4MTQ4NDM2NXww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Olia Budaeva
  profile_url: https://unsplash.com/@oliabudaevaeverything?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Recently, the Laravel team launched the beta of the Laravel MCP package. The idea of the
  package is to aid the development of building MCP servers for your applications. This is
  the 2nd first party AI focused package…
---

Recently, the Laravel team launched the beta of the Laravel MCP package. The idea of the package is to aid the development of building MCP servers for your applications. This is the 2nd first party AI focused package that the team has released, the first of which was Laravel Boost

<figure class="bookmark-card">
<a class="bookmark-card-link" href="/laravel-boost/">
<div class="bookmark-card-content">
<div class="bookmark-card-title">Laravel Boost</div>
<div class="bookmark-card-description">This week, I took Laravel Boost for a spin. Boost is a new package by Laravel that, in their own words: &quot;Accelerates AI-assisted development by providing the essential context and…</div>
<div class="bookmark-card-meta">
<img class="bookmark-card-icon" src="/favicon.png" alt="" width="18" height="18" loading="lazy" decoding="async" />
<span class="bookmark-card-publisher">Jon Purvis</span>
</div>
</div>
<div class="bookmark-card-thumbnail"><img src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wxMTc3M3wwfDF8c2VhcmNofDd8fHJvY2tldHxlbnwwfHx8fDE3ODE0ODMwOTJ8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=2000" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>
</a>
</figure>

Laravel MCP provides an intuitive framework for AI agents to interact with your application. Let's take a look at how it works:

```php
namespace App\Mcp\Servers;
 
use Laravel\Mcp\Server;
 
class WeatherServer extends Server
{
    /**
     * The tools registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Tool>>
     */
    protected array $tools = [
        // ExampleTool::class,
    ];
 
    /**
     * The resources registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Resource>>
     */
    protected array $resources = [
        // ExampleResource::class,
    ];
 
    /**
     * The prompts registered with this MCP server.
     *
     * @var array<int, class-string<\Laravel\Mcp\Server\Prompt>>
     */
    protected array $prompts = [
        // ExamplePrompt::class,
    ];
}
```

The above snippet is an example MCP server which allows you to define tools, resources and prompts. For an example tool, you'd do something like the following:

```

 
use Illuminate\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;
 
class CurrentWeatherTool extends Tool
{
    protected string $description = 'Fetches the current weather forecast for a specified location.';
 
    public function handle(Request $request): Response
    {
        $location = $request->get('location');
 
        // Get weather...
 
        return Response::text('The weather is...');
    }
 
    public function schema(JsonSchema $schema): array
    {
        return [
            'location' => $schema->string()
                ->description('The location to get the weather for.')
                ->required(),
        ];
    }
}
```

* * *

Admittedly, I've always been put off building an MCP server for my applications because there was never a simple way to do it, or even a great guide on how to do it. With the MCP package, everything I think I would've struggled with seems to be taken care off.

Over the next couple of weeks, I'm going to be taking a deeper look into the MCP beta, to see if I can see it have a place within our Shopify apps at work.
