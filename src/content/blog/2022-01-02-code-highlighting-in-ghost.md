---
title: Code Highlighting in Ghost
slug: code-highlighting-in-ghost
date: 2022-01-02T17:04:33.000Z
updated: 2023-08-29T00:11:16.000Z
tags:
  - development
feature_image: >-
  https://images.unsplash.com/photo-1607970669494-309137683be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEwNnx8Y29kZXxlbnwwfHx8fDE2NDExMzQ2NDA&ixlib=rb-1.2.1&q=80&w=2000
feature_image_credit:
  name: Mohammad Rahmani
  profile_url: https://unsplash.com/@afgprogrammer?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
excerpt: >-
  Ghost currently doesn't ship with Code Highlighting, you can render code but to get it to
  highlight correctly depending on the language, that's something you need to do yourself. There's
  numerous code highlighters you…
---

Ghost currently doesn't ship with Code Highlighting, you can render code but to get it to highlight correctly depending on the language, that's something you need to do yourself.

There's numerous code highlighters you could use for this, but the one I've always gravitated towards, and the one that seems to be recommended by a lot of folks is [Prism](https://prismjs.com/).

Prism makes it really easy to properly highlight your code blocks, depending on the language. When I launched this site, I didn't want to have to dig around and edit bits of code to get proper highlighting, thankfully though I can utilise the Ghost Code Injection feature.

Code Injection allows you to, well, inject bits of code into the header and footer of the website, so by injecting Prism into the header and footer, I can get instant code highlighting without doing anything else. In my head, I have:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/line-numbers/prism-line-numbers.min.css" />
```

<head> content for Prism

The first stylesheet is the theme I'm using. I played around with a bunch of different ones but I liked the look of the *Tomorrow* theme the most. The second stylesheet is a plugin for Prism which generates snippets with page numbers. I wanted code snippets on this website to resemble what you'd see in an IDE a bit closer, so line numbers were a must!

In the footer is where I inject all of the Prism scripts to get the thing to actually work:

```html
<script>
window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre[class*=language-]').forEach(function (node) {
        node.classList.add('line-numbers');
    });
Prism.highlightAll();
});
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-markup-templating.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-php.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-css.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-html.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-js.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-json.min.js"></script>
```

<footer> content for Prism

The first and fourth script handles the line numbers I just mentioned. The second script is the bulk of Prism, the third script totally threw me off as I didn't realise you also needed that for it work, I couldn't remember having it in previous uses of the library.

The rest of the scripts are individual language highlighting scripts. By default, Prism only comes with a small handful of languages and if you want others, you have to manually specify them. This isn't so bad though as I think I've covered everything I need.

One you've injected the correct scripts, highlighting should be working on the front end of the site! It would be nice if Ghost had a proper integration with Prism, rather than having to inject scripts into the header and footer as whilst it works, it does mean it loads the library onto every single page, when in reality, only a handful of pages need it.

Maybe we'll see this functionality as native in a future Ghost version? 🤞
