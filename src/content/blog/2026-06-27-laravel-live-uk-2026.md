---
title: Laravel Live UK 2026
slug: laravel-live-uk-2026
date: 2026-06-27T23:00:04.000Z
updated: 2026-06-27T23:00:03.000Z
tags:
  - conferences
  - development
feature_image: /images/posts/laravel-live-uk-2026/header.JPG
excerpt: >-
  I am writing this from the comfort of my garden, just a few days after returning from London for
  Laravel Live UK 2026. What an absolute blast it was. The energy this year was unmatched by any
  previous conference I’ve…
photo_album: laravel-live-uk-2026
---

## Introduction

I am writing this from the comfort of my garden, just a few days after returning from London for **Laravel Live UK 2026**. What an absolute blast it was. The energy this year was unmatched by any previous conference I’ve attended. It was wonderful to catch up with familiar faces and equally rewarding to make a host of new friends whom I hope to cross paths with at future events.

I wanted to put together a recap detailing the event from my perspective, covering everything from the journey down to the talks and the social side of the conference.

* * *

## Travelling to London

To make the logistics as seamless as possible, I travelled down on Wednesday evening and stayed at a city hotel just a short walk from the venue. I generally prefer taking later trains, as they are usually a bit cheaper and significantly quieter.

Arriving the night before meant there was no need for a stressful, super-early alarm on Thursday morning. Instead, I could enjoy a proper hotel breakfast, get ready at my own pace, and head over to the venue feeling completely refreshed.

* * *

## Day 1 (Conference)

After breakfast (or rather, second breakfast) it was time to kick off the event. Our MC for the two days was the wonderful James Brooks, who did a fantastic job guiding us through the schedule. He certainly deserved every bit of the applause he (eventually) received. If you know, you know.

### 1\. Optimising Workflows & Shipping to Production | *Ryan Chandler*

Ryan kicked off the sessions by tackling common development bottlenecks such as slow feedback loops, long-lived Pull Requests (PRs), brittle test suites, and risky deployments. His point about long-lived PRs hit home; I have definitely been guilty of leaving PRs open for months, to the point where it is sometimes easier to close them and start afresh.

Ryan shared excellent advice on structuring seeders and leveraging the `fake()` method with Facades. At work, we recently migrated our Shopify apps to use `Sleep::fake()` instead of standard PHP sleep functions, which has drastically sped up our test suites. I also loved his approach to using feature flags to toggle API fakes, allowing you to mock external APIs rather than your internal application logic.

My biggest takeaway from Ryan was a simple mantra: **"Ship in smaller pieces."** Having submitted multi-thousand-line PRs in the past, which is no fun for anyone to review, I am going to make a conscious effort to map out my work into smaller, manageable, and easily reversible chunks before touching the keyboard. He also showcased a brilliant `SafeMigration` class that acts as a wrapper to lower the default MySQL `lock_wait_timeout`. In a nutshell: faster feedback, higher confidence, smaller changes, and safer releases.

### 2\. Bulletproofing Your Laravel Code with Value Objects | *Harris Raftopoulos*

Harris delivered a highly practical talk that made a complex architecture concept incredibly simple to grasp. By displaying a standard block of code and highlighting exactly where Value Objects could step in, everything clicked.

He broke down exactly when to implement them:

*   When validation logic is repeated across multiple places.
*   When dealing with values that could accidentally be swapped, like latitude and longitude.
*   When a specific value carries formatting or display rules.

Conversely, he advised that fixed lists of known data, like countries or currencies, are better suited for Enum classes. Harris also highlighted his own package, **Aegis for Laravel**, which provides helpers for Value Object scaffolding and validation. This is definitely one I will be installing soon.

### 3\. Escaping the Code Maze | *Yannick Chenot*

This talk was originally delivered at PHP UK 2026 earlier this year, but because of a track clash, I missed it. I was delighted Yannick redelivered it here because it was incredibly insightful.

I filled my notepad with tools to explore, most notably integrating **RectorPHP** into our Shopify apps. Rector was a recurring theme throughout the conference, and with good reason; it is easily one of the best packages you can introduce to a codebase. Yannick introduced me to `driftingly/rector-laravel` and `rectorphp/swiss-knife`, both of which are now on my to-do list.

We also looked at **Laravel Pint** configurations, including custom rules you can add to your `pint.json` file, which is something I always tend to forget about. On the static analysis front, he discussed PHPStan and Larastan. While my projects usually target level 6, I discovered that Laravel Starter Kits now enforce level 7 by default, so it might be time to raise my own baseline. Finally, he mentioned `deptrac/deptrac`, a tool I hadn’t encountered before, which I am keen to compare against my usual PHPStan workflow.

### 4\. Intro to Laradrome: Meta-programming in Laravel | *Wendell Adriel*

I have interacted with Wendell quite a few times on X, and he is just as genuinely nice in person as he is online. Going into his session, I wasn't entirely sure what meta-programming actually entailed. Wendell defined it beautifully as **"code that reasons about code"**—reading the shapes, names, and metadata of a codebase to dynamically dictate behavior.

He broke the concept down into four core PHP primitives: magic methods, reflection, attributes, and closure binding. It was a real lightbulb moment for me; as it turns out, I have actually used meta-programming extensively through my open-source work with PestPHP!

What made the talk especially engaging was seeing how Laravel takes these raw PHP primitives and turns them into the seamless developer experience we use every day. For instance, he demonstrated how Eloquent uses magic methods for dynamic query building, how Facades map static calls to the service container under the hood, and how Macros leverage closure binding to let us dynamically extend core classes.

He also gave us a look at the future, showcasing how heavily Laravel 13 leans into native PHP attributes. With over 70 framework attributes now available, you can use things like `#[Table]` or `#[Scope]` directly on your Eloquent models, or inject dependencies cleanly into constructors using attributes like `#[Storage('s3')]` and `#[Config('app.timezone')]`. It completely removes the usual boilerplate code.

Wendell's core message was that Laravel's "magic" is actually just a contract; once you understand how that contract works, the framework becomes incredibly simple. It was an excellent presentation, and Wendell received some well-deserved shoutouts throughout the conference for being the primary driving force behind Laravel's fantastic starter kits.

### 5\. 50 Laravel Tips | *Liam Hammett*

This was the talk where I took the most notes. While I was already implementing a fair few of the tips, there were plenty of hidden gems. For example, I’ll be adopting methods like `prohibitDestructiveCommands`, `preventSilentlyDiscardingAttributes`, and `preventAccessingMissingAttributes` to make my applications more robust.

On the dev-ops side, I learned that Dependabot has a `default-days` configuration, allowing you to delay package updates by a set number of days. I have been waiting for a feature like this within Composer itself, so finding out Dependabot can handle it is a massive win for my repository configs.

Liam also made an excellent point about publishing and customising stub files to match your team's standard conventions for new models and controllers. He also advocate for **Bun** as a faster alternative to NPM. At the very end, he casually mentioned he actually has a slide deck of 101 Laravel tips, so hopefully, we get part two next year!

### 6\. Event-Driven Evolution with AI as My Partner in Design | *Naomi Gotts*

Another talk I missed at PHP UK due to scheduling, Naomi’s session focused on how her team integrated a complex new financial system into their existing platform.

Because the financial domain involves a lot of specialised terminology that is completely foreign to most developers, they utilised AI as a collaborative partner to demystify these terms and help map out the architectural implementation. Even though I don't work with financial gift cards, the core theme was incredibly relatable; it is a blueprint I can easily apply to complex client domains I have faced in the past.

### 7\. Teams That Scale | *Ollie Reardon*

Though my current role doesn't involve managing engineers, Ollie’s insights on onboarding and project alignment were fascinating. He emphasised the core questions teams should ask before green lighting work: Does this save or make the company money? Does it genuinely improve the customer experience? It was a great reminder of how technical choices must always align with business value.

### 8\. What Do We Do Now? | *Aaron Francis*

Closing out Day 1 was Aaron Francis, who tackled the existential question hanging over the industry: With the rapid rise of AI, if the machine can write the code, do we as developers still have value? Aaron’s answer was a resounding, brilliant yes.

The biggest technical takeaway for me was his concept of writing **Deterministic Checks** for AI agents. Aaron demonstrated how he built these for his application, Solo. Essentially, these are tests for your AI prompts to ensure they have executed a task correctly. For instance, he used a check to guarantee the agent styled an element with `text-muted-foreground` instead of `text-muted`. While you can instruct an agent to do this in a system prompt, they don't always listen. Creating deterministic checks brings certainty back to AI workflows; the agent either passes the test or fails it.

* * *

## Day 1: The Social

For the evening social, the crowd headed over to a Shuffleboard bar located about ten minutes from the venue.

Because my hotel was so close, I managed to nip back, drop off my bag, and freshen up before joining everyone. By that point in the evening, conference fatigue had definitely set in. I stayed for a drink and a catch-up, then headed back to the hotel to unwind for a few hours before grabbing some dinner and calling it a night.

* * *

* * *

## Day 2 (Conference)

After a hearty hotel breakfast (followed inevitably by another second breakfast at the theatre) it was time to kick off the second day of talks. Looking back, I remembered just how exhausted I felt last year after travelling over an hour into the city for Day 2. Staying so close to the venue this time around made a world of difference, and I felt completely refreshed and ready for the sessions ahead.

### 1\. Laravel Starter Kits: Past, Present and Future | *Povilas Korop*

Kicking off Day 2 was Povilas Korop, whom many will know as the brains behind Laravel Daily. Povilas gave a fantastic overview of the evolution of Laravel's suite of starter kits, giving another well-deserved nod to Wendell Adriel for his massive contributions to them.

During the presentation, it got me thinking about whether we could build a dedicated starter kit for our Shopify applications at work. We currently use a template repository that we fork for new projects, but a tailored starter kit felt like a logical next step. Unfortunately, that idea hit a bit of a snag during the Q&A session when someone asked about the feasibility of private starter kits. Because starter kits are essentially standard Composer dependencies, managing them privately would likely require a solution like Private Packagist to work securely.

### 2\. Building Modern Laravel Frontends with Inertia v3 + React | *Leah Thompson*

This session was particularly interesting for a couple of reasons. First, I still consider myself fairly new to Inertia, having only really adopted it over the past year or so. While I still rely on AI to handle a lot of my Inertia heavy lifting, I know enough about the ecosystem to appreciate good architecture when I see it. Second, Inertia and React make up the core frontend stack for our Shopify apps at work, but we are currently running on v2, so I was incredibly keen to see what v3 brings to the table.

Leah walked us through a series of impressive live demos, explaining exactly how things operate under the hood using a custom application she built specifically for the conference. She dove deep into the new features of Inertia v3, including the updated Vite plugin, layout props, prefetching, and optimistic updates. The clear standouts for me were **prefetching** and **optimistic updates**, both of which look set to drastically improve the perceived performance and user experience of modern web apps.

### 3\. Stepping Away From the Code… But Not Quite | *Wim Godden*

Before the next session, we had the morning break, which featured the best smoothies I have ever tasted. I can only remember that they had apple in them, though the other flavour completely escapes me!

Once we were back inside, Wim Godden took to the stage. Remarkably, this was the third talk on the schedule that had also been delivered at PHP UK earlier this year, and it was *also* the third one I had missed due to scheduling clashes at that event. I felt incredibly lucky; otherwise, three of the sixteen talks across this entire weekend would have been repeats for me.

Wim's presentation covered a whole range of fascinating topics, starting with a fundamental question: what actually defines a senior developer? His answer was "reflexes", the adaptability to jump between diverse projects, varied responsibilities, and different technology stacks seamlessly. A true senior should be looking at the bigger picture, evaluating whether a proposed solution will scale or if it will simply introduce architectural headaches down the line.

One particular concept that struck a chord with me was his critique of the traditional career ladder analogy. We are often conditioned to think that the only way to progress is upwards, and that stepping down a rung implies failure. Wim completely flipped this script, suggesting we view our careers as a **landscape** instead. A landscape naturally features peaks and valleys. When you are standing on a peak, you are looking down at the valley below; when you are in a valley, you are looking up at the peak, figuring out what you need to do to scale it. For instance, you might act as the tech lead on one project, but step back into a senior developer role on the next. It does not mean you have failed. Everyone's career path is unique, and navigating the terrain looks different for everyone.

### 4\. OPSEC for Laravel Developers | *Emma De Silva*

The final session before lunch was a highly anticipated one for me. I have been on a bit of a security drive lately, focusing on making our Shopify applications as robust as possible, so I was keen to pick up some practical tips to take back to my team.

Emma packed the talk with excellent advice, starting with some critical operational red flags:

*   "Everyone shares the same deployment key."
*   "Only one person actually understands the server configuration."
*   "We have never performed a test recovery on our backups."

Hearing those definitely brought back memories of past roles, and they are scenarios I never want to experience again! Emma covered essential practices like rigorous `.env` file hygiene, regular key rotation, and leveraging automated tools such as `composer audit`, Snyk, and Dependabot. She also gave us a checklist of tough questions to ask our employers, including "Who exactly has permission to merge to main?" and "Who holds root access on the production servers?"

There are definitely areas where my team can tighten things up, and many of them fall into the "quick wins" category. The immediate priority is integrating `composer audit` straight into our CI/CD pipelines. Since the talk, I have already audited a few of our repositories and spotted a couple of transitive dependencies with known vulnerabilities, something we need to resolve immediately.

I also really liked Emma's concept of an **Access Matrix**. She used a brilliant building analogy: just because someone has a key to the front door of an office block, it does not mean they should have access to every single room inside. An access matrix is a fantastic, highly visual tool to map out and review exactly who holds permission for what across the entire business.

At the end of the session, Emma provided a QR code packed with resources, checklists, and an "ask on Monday" action list. I am already using these to compile a thorough audit checklist to ensure our security posture is exactly where it needs to be.

### 5\. Deep Dive into NativePHP | *Shane Rosenthal*

After a hearty lunch and a welcome bit of time sitting out in the sun, it was time to head back into the beautifully cool auditorium for the afternoon sessions.

The first slot went to Shane Rosenthal for a deep dive into NativePHP. I originally met Shane last year at PHP UK, and he is a brilliant guy. He is easily one of the most enthusiastic, passionate developers in the PHP community. The work he and Simon Hamp have put into NativePHP is nothing short of amazing.

In his talk, Shane walked us through a massive array of new features that have been added to the ecosystem, collectively dubbed "SuperNative". This included a look at new UI components like counters, lists, and opacity controls, but what really stole the show for me were the sleek animations Shane has been crafting. He showcased native animations for easing, toggling, crossfading, and more, proving just how polished these apps can look.

They have made it incredibly straightforward to build native-feeling apps for both iOS and Android using the PHP tools we already know and love. Shane also showcased some of the "liquid glass" UI styling he has been experimenting with, which looked absolutely beautiful on screen. The velocity of this project is wild; so much has changed even since Simon’s presentation at PHP UK a few months ago, and it sounds like they are only just getting started.

### 6\. Rector Beyond The Upgrades | *Dave Liddament*

The penultimate talk was given by Dave Liddament, who explored the wider capabilities of automated refactoring. A recurring theme across the entire conference was that RectorPHP was being mentioned a lot, and for very good reason. As I noted earlier, it is easily one of my favourite packages, and I desperately want to integrate it into our Shopify apps at work.

Dave gave an excellent overview of Rector, detailing its core purpose, why teams should adopt it, and some of the rules it offers out of the box. I had no idea that there are actually over 700 rules available! He also introduced a fascinating concept called "Tombstones", which is a structured way of identifying dead code that never gets executed in production, making codebase cleanup significantly safer and easier. I had never encountered the concept before, but it makes total sense.

Dave then walked us through how to create a custom rule by utilising the underlying `nikic/php-parser` package. Despite using Rector heavily in the past, I have never actually looked into writing custom rules myself, so this is definitely on my list of things to explore.

To close, Dave recommended a book, *Rector: The Power of Automated Refactoring*. Given it is remarkably affordable at around $9, I am going to pick up a couple of copies for the engineering team. He also highlighted the AST (Abstract Syntax Tree) playground on the Rector website, which is incredibly useful when building custom rules. At the time of writing this, that specific URL seems to redirect straight to the main documentation page, but it is certainly worth keeping an eye on.

### 7\. Is This the Future of AI Coding? | *Ashley Hindle*

Closing out the conference was Ashley Hindle, whom you might recognise as a former Laravel employee and the creator of Laravel Boost (if you haven’t tried Boost yet, I highly recommend checking it out).

Ashley’s session was a captivating look at what he believes the future of AI-driven development looks like, detailing the shifts he is betting his entire career on and how the Software Development Life Cycle (SDLC) is poised to evolve.

His core predictions center around a few major pillars:

*   **The New SDLC:** Shifted to a loop of *Plan, Delegate, and Verify*.
*   **Agents Only:** Moving entirely away from manual typing and autocomplete tools.
*   **Cloud First:** Driven by automation, mobile-first workflows, and software "factories".
*   **Multi-model Architecture:** Utilising State-of-the-Art (SOTA), open-weight, and local models via intelligent routing.
*   **Massive Multi-tasking:** Where generalists excel, and humans operate primarily at the edge.

Ashley gave us a glimpse of Fuel, the latest product he is building to support this future. It is still very early days so the specifics may shift, but it looks incredibly impressive. One of his boldest claims was that Pull Requests will eventually cease to exist. While that sounds a bit daunting to hear as a developer, Fuel is built precisely with this paradigm in mind. The code is still visible if you want to inspect it, but it is no longer the primary interface; it is a platform completely designed for autonomous AI agents.

He also explored the concept of Reproducible, Parallelisable Development Environments, allowing teams to instantly spin up isolated, fully configured environments where an agent can get straight to work.

Things took a slightly dystopian turn when he discussed "Dark Factories" like StrongDM, where the operational rules are strictly defined:

*   Code must *not* be written by humans.
*   Code must *not* be reviewed by humans.

Is that taking things a step too far? Quite possibly!

To ground these autonomous systems, Ashley went into detail about enforcing strict quality gates. For example, pre-commit stages should run tools like Rector, Pint, and Larastan, while pre-push gates should run smoke tests and end-to-end suites.

He also emphasized the importance of "Golden Examples"—perfectly written baselines of your controllers, migrations, and routes that agents can reference for style and context. Under this model, your repository's `AGENTS.md` file should remain slim, containing only the high-level project goal, architectural guidelines, golden example pointers, and core instructions (like "always write tests"). He also touched on provisioning specialized agent skills (such as frontend design or SVG animations) and ensuring agents have safe, sandboxed access to essential tools like headless browsers, the GitHub CLI, production logs, documentation, and a test database.

* * *

### Day 2: The Social

Once the final curtains closed on the conference, we headed just across the road to O'Neill's for a well-deserved pint. It was the perfect opportunity to raise a glass to a brilliant couple of days, though the heat inside eventually got the better of me. With a headache starting to set in, I decided to play it safe, said my goodbyes to the group, and made my departure.

Before catching my train home, I managed to squeeze in a couple of local Geocaches and even had just enough time to grab a brilliant pizza from Pizza Union to fuel the journey back.

* * *

### Conclusion and Heading Back Home

Reflecting on the journey back, Laravel Live UK 2026 was a truly fantastic conference. I have been to a fair few tech events now, but I have never filled my notebook with quite so many notes before. The sheer volume of ideas, tools, and workflows I want to try out off the back of these two days is a testament to how practical the schedule was.

Beyond the technical takeaways, I also made a ton of new friends and valuable contacts. I always find myself repeating this advice, but at these events, the talks are really only half the story. The networking side is a massive component, offering a brilliant opportunity to share experiences and learn even more from your peers in casual conversation.

The overarching theme of this year was unmistakably about codebase refinement, establishing a solid engineering culture, and learning how to effectively leverage AI as a collaborative partner rather than a threat. I left London feeling incredibly inspired and equipped with a long list of quick wins to implement with my team—from tightening our CI/CD security pipelines with automated audits to experimenting with smaller, safer deployment workflows and exploring the power of custom Rector rules.

A massive thank you to the organisers, the speakers, and the fantastic Laravel community for making it such a memorable couple of days. Here's to seeing everyone again next year!
