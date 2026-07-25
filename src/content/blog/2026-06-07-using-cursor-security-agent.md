---
title: Using Cursor Security Agent
slug: using-cursor-security-agent
date: 2026-06-07T20:22:00.000Z
updated: 2026-06-13T20:22:57.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1548092372-0d1bd40894a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDF8fHNlY3VyaXR5fGVufDB8fHx8MTc4MTM4MjEzMXww&ixlib=rb-4.1.0&q=80&w=2000
feature_image_credit:
  name: Philipp Katzenberger
  profile_url: https://unsplash.com/@fantasyflip?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Last month, we received a report from a security researcher via our helpdesk that one of our apps
  was susceptible to XSS attacks. The report was on a weekend, but given the urgent nature (and the
  fact I wasn't doing…
---

Last month, we received a report from a security researcher via our helpdesk that one of our apps was susceptible to XSS attacks. The report was on a weekend, but given the urgent nature (and the fact I wasn't doing much), I got to work on fixing it.

The app itself is a Wishlist app. One of the features is being able to name your Wishlist e.g. "Christmas List" or "Birthday List". Our validation rules for this field weren't up to scratch, we validated the name and ensured it was unique against the customer, but that's about it. One thing we didn't check, is to make sure that you couldn't submit a script as the name, which you could. What made this worse is when you viewed your wishlist, we executed that script. This means a malicious actor could be sneaky with their name, share their wishlist, have people visit it and cause all sorts of trouble.

A patch was quickly issued and deployed and the security issue was resolved. I went back to the reporter and let them know it was fixed and what we did to fix it.

The following week, we decided to run the Cursor security agent across all of our apps, to see what other issues came up. Admittedly, as a team, security is something we definitely need to think about and this incident definitely opened our eyes and has changed our way of thinking. Just because our apps are embedded within Shopify, we still need to ensure we're taking security seriously, as if our apps were stand-alone.

The agent was pretty good at picking up issues and it really got us thinking about our apps. I verified each one and submitted them as Github issues and the team is currently working through them. Below are the categories it picked up:

*   **Authentication & Authorization Bypasses (High Severity)**
    *   Broken Authentication & Spoofing
    *   Missing or Weak Middleware
    *   Missing Authorization (IDOR / Cross-Tenant Access)
*   **Server-Side Request Forgery (SSRF) & Input Injection (High Severity)**
    *   Server-Side Request Forgery (SSRF)
    *   Injection Flaws & Path Traversal
*   **Information Disclosure & Sensitive Data Exposure (Medium Severity)**
    *   Verbose Error Handling & Leaked Exceptions
    *   Insecure Logging & Transport Risks
*   **Business Logic Errors & Resource Abuse (Medium Severity)**
    *   Arbitrary Pricing & Plan Bypasses
    *   Race Conditions & Validation Flaws
*   **Insecure Infrastructure & Configuration Flaws (Medium/High Severity)**
    *   Network & Environment Security (Wildcards & Exposed Routes)
    *   Missing Replay Protection
    *   Client-Side Security Flaws (XSS / Open Redirects)

Our plan is to run this on a cron, monthly. Which is something Cursor allows. The only thing missing is a direct integration with Github, I spent a lot of time logging these issues in Github where my time could've been elsewhere! Hopefully they add this feature soon!
