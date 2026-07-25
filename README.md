# jonathanpurvis.co.uk

Personal blog for [Jon Purvis](https://www.jonathanpurvis.co.uk/), migrated from Ghost to a static [Astro](https://astro.build/) site hosted on GitHub Pages.

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

## Re-running Ghost migration

If you need to re-import from a Ghost JSON export:

```bash
npm run migrate -- /path/to/export.json
```

This overwrites Markdown under `src/content/` and downloads Ghost-hosted images into `public/images/`.

## DNS cutover (cancel Ghost last)

Do **not** cancel Ghost until images and HTTPS are confirmed.

1. **Enable GitHub Pages** on this repo: Settings → Pages → Source = **GitHub Actions**.
2. Push to `main` and confirm the deploy workflow succeeds.
3. Preview at `https://jonpurvis.github.io/` (before custom domain) or via the Actions deployment URL.
4. Spot-check key URLs: `/`, `/laravel-live-uk-2026/`, `/laravel-live-uk-2026/photos/`, `/about/`, `/tag/development/`, `/rss/`.
5. In Pages settings, add custom domain `www.jonathanpurvis.co.uk` (CNAME file is already in `public/CNAME`).
6. At your DNS provider:
   - `www` → CNAME to `jonpurvis.github.io`
   - Apex (`jonathanpurvis.co.uk`) → A/AAAA records per [GitHub Pages docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), or ALIAS/ANAME to `jonpurvis.github.io` if supported
7. Wait for DNS + HTTPS certificate (can take up to 24h; often much faster).
8. Confirm Search Console still verifies.
9. **Then** cancel the Ghost subscription.

## Stack

- Astro static site
- Content collections (Markdown)
- `@astrojs/sitemap` + RSS at `/rss.xml` (with `/rss/` redirect)
- Source-inspired layout (Chakra Petch + Space Mono, accent `#00e20b`)
