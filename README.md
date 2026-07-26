# jonathanpurvis.co.uk

Personal blog for [Jon Purvis](https://www.jonathanpurvis.co.uk/). Built with [Astro](https://astro.build/) and hosted on GitHub Pages.

![Homepage](homepage.png)

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Writing a post

1. Add `src/content/blog/YYYY-MM-DD-slug.md` with frontmatter (`title`, `slug`, `date`, `tags`, `feature_image`, optional `feature_image_credit`).
2. For Unsplash headers, include photographer credit:

```yaml
feature_image_credit:
  name: Photographer Name
  profile_url: https://unsplash.com/@handle?utm_source=jonathanpurvis&utm_medium=referral
  unsplash_url: https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral
```

3. Commit and push to `main` — GitHub Actions deploys automatically.

## Stack

- Astro static site
- Content collections (Markdown)
- `@astrojs/sitemap` + RSS at `/rss.xml` (with `/rss/` redirect)
- Source-inspired layout (accent `#00e20b`)
