---
title: Laravel Cashier is awesome!
slug: laravel-cashier-is-awesome
date: 2024-12-15T16:29:00.000Z
updated: 2024-12-21T16:50:32.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1639189702833-8de5ecf2ca8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDh8fHBheW1lbnR8ZW58MHx8fHwxNzM0Nzk4NTQ4fDA&ixlib=rb-4.0.3&q=80&w=2000
feature_image_credit:
  name: Yuri Krupenin
  profile_url: https://unsplash.com/@cubeofwood?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  I recently had a reason to dive into Laravel Cashier when it came time to start working on billing
  for the SaaS I'm currently helping out on. I'd heard of Laravel Cashier before but didn't really
  have any use for it…
---

I recently had a reason to dive into [Laravel Cashier](https://laravel.com/docs/11.x/billing) when it came time to start working on billing for the SaaS I'm currently helping out on.

I'd heard of Laravel Cashier before but didn't really have any use for it until now, so I was excited to dive into it and see just how easy it makes adding subscription based billing to your application. I've used [Stripe](https://stripe.com/gb)'s API for years so I'm familiar with how Stripe works with customers and subscriptions, in fact, Stripe have one of the best API's I've ever used, so I knew Laravel Cashier was going to be really nice to work with.

The SaaS I'm working on has multiple plans, so I wanted a way of a customer being able to sign up, select a plan and be on their way in a speedy manner. I also wanted the customer to be able to amend their plan, whether it be going to the next plan up or dropping down a plan. Lastly, I wanted the customer to be able to cancel their plan, without needing to fill in a contact form and waiting for someone to manually cancel it. It should be entirely self serve. I took inspiration from how SaaS products such as [Laravel Forge](https://forge.laravel.com/) and [Oh Dear](https://ohdear.app/) do it.

If you don't know what Laravel Cashier is, well its a first party package by Laravel which makes it really simple to interact with Stripe's subscription billing service. It's a popular choice for SaaS products who wish to have a billing element. It also interacts with another payment provider called [Paddle](https://www.paddle.com/).

Like I do with every new tool I use, I headed straight to the documentation and gave it a read over. It was pretty late though and I'm pretty sure I didn't read it all which is why I spent 2-3 hours implementing a bunch of custom logic to take payments via Stripe, which seemed like a massive task and I wasn't really enjoying the experience, it felt like it was a lot of work and potentially a lot of maintenance if Stripe ever change how they do things. I was faffing around with adding things like:

```html
<script src="https://js.stripe.com/v3/"></script>
 
<script>
    const stripe = Stripe('stripe-public-key');
 
    const elements = stripe.elements();
    const cardElement = elements.create('card');
 
    cardElement.mount('#card-element');
</script>
```
```
const cardHolderName = document.getElementById('card-holder-name');
const cardButton = document.getElementById('card-button');
const clientSecret = cardButton.dataset.secret;
 
cardButton.addEventListener('click', async (e) => {
    const { setupIntent, error } = await stripe.confirmCardSetup(
        clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: { name: cardHolderName.value }
            }
        }
    );
 
    if (error) {
        // Display "error.message" to the user...
    } else {
        // The card has been verified successfully...
    }
});
```

It seemed very code heavy, which I thought Laravel Cashier would've avoided me doing, after all, it's meant to make it easier to deal with Stripe but I found myself still adding a lot of code to my application.

Then it hit me...

[Stripe have their own checkout](https://stripe.com/gb/payments/checkout)...

So I went back to the documentation for Cashier and found the [Checkout](https://laravel.com/docs/11.x/billing#checkout) section, which I'd somehow absolutely missed when I first read through it. This was Perfect! Stripe handles pretty much everything for me and even handles updating users and subscriptions in my application via a Webhook 🤯

I scrapped the work I'd already done and had my application interacting with Stripe in ~30 minutes. Users could sign up, select a plan and manage their subscription all via Stripe Checkout, and then Stripe would simply send the data over to my webhook for it to update application side, thanks to Cashier.

As I'm using Stripe Checkout, it's really simple to offer things like a certain number of trial days or discount codes, plus the interface is extremely simple and very intuitive too.

My work on this isn't quite done, I'd like to pull things like invoices into my application instead of redirecting the user to Stripe to view them, but that's a task for much later down the line. I'm just happy to have a painless billing solution all thanks to Cashier and Stripe.
