#!/usr/bin/env node
/**
 * Migrate Ghost export JSON → Astro Markdown content + local images.
 *
 * Usage: node scripts/migrate-ghost.mjs [path-to-export.json]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { dump as yamlDump } from 'js-yaml';
import TurndownService from 'turndown';
import { gfm, tables, strikethrough } from 'turndown-plugin-gfm';

const ROOT = path.resolve(import.meta.dirname, '..');
const DEFAULT_EXPORT =
  '/Users/jonathan.purvis/Downloads/jon-purvis.ghost.2026-07-24-23-23-08.json';
const GHOST_ORIGIN = 'https://www.jonathanpurvis.co.uk';

const KEEP_TAGS = new Set([
  'development',
  'elephpants',
  'conferences',
  'packages',
  'pestphp',
  'saloonphp',
  'ai',
  'speaking',
  'music',
  'general',
]);

const TAG_REMAP = {
  gaming: 'general',
};

/** Posts whose kg-galleries become photo albums */
const GALLERY_ALBUMS = {
  'laravel-live-uk-2026': {
    title: 'Laravel Live UK 2026',
    description: 'Photos from Laravel Live UK 2026 in London.',
  },
};

const exportPath = process.argv[2] || DEFAULT_EXPORT;

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
});
turndown.use(gfm);
turndown.use([tables, strikethrough]);
turndown.addRule('keepPreCode', {
  filter: ['pre'],
  replacement(content, node) {
    const code = node.querySelector('code');
    const text = code ? code.textContent : node.textContent;
    const className = code?.getAttribute('class') || '';
    const lang = (className.match(/language-([\w-]+)/) || [])[1] || '';
    return `\n\`\`\`${lang}\n${text.replace(/\n$/, '')}\n\`\`\`\n`;
  },
});

/** Keep Ghost callout cards as styled HTML asides (no emoji). */
turndown.addRule('calloutCard', {
  filter(node) {
    return (
      node.nodeName === 'DIV' &&
      node.classList?.contains('kg-callout-card')
    );
  },
  replacement(_content, node) {
    const textEl = node.querySelector('.kg-callout-text');
    let html = (textEl?.innerHTML || node.textContent || '')
      .replace(/^\s+|\s+$/g, '');
    if (!html) return '';

    // Prefer a short bold lead-in as the title when present: <strong>Title</strong>: body
    let title = 'Note';
    let body = html;
    const lead = html.match(
      /^\s*<strong>([^<]+)<\/strong>\s*:?\s*([\s\S]*)$/i,
    );
    if (lead && lead[1].trim().length <= 40) {
      title = lead[1].trim();
      body = lead[2].replace(/^:\s*/, '').trim();
    } else {
      // Unwrap a single strong wrapping the whole callout
      const wrapped = html.match(/^\s*<strong>([\s\S]*)<\/strong>\s*$/i);
      if (wrapped) body = wrapped[1].trim();
    }

    if (!/^<\s*p[\s>]/i.test(body)) body = `<p>${body}</p>`;
    return `\n\n<aside class="callout callout-info">\n<strong>${title}</strong>\n${body}\n</aside>\n\n`;
  },
});

/** Keep Ghost bookmark cards as styled HTML. */
turndown.addRule('bookmarkCard', {
  filter(node) {
    return (
      node.nodeName === 'FIGURE' &&
      node.classList?.contains('kg-bookmark-card')
    );
  },
  replacement(_content, node) {
    const link = node.querySelector('a.kg-bookmark-container') || node.querySelector('a');
    const href = link?.getAttribute('href') || '';
    if (!href) return '';

    const title =
      node.querySelector('.kg-bookmark-title')?.textContent?.trim() || href;
    const description =
      node.querySelector('.kg-bookmark-description')?.textContent?.trim() || '';
    const publisher =
      node.querySelector('.kg-bookmark-publisher')?.textContent?.trim() || '';
    const icon = node.querySelector('.kg-bookmark-icon')?.getAttribute('src') || '';
    const image =
      node.querySelector('.kg-bookmark-thumbnail img')?.getAttribute('src') || '';

    let finalHref = href;
    let finalPublisher = publisher;
    let finalIcon = icon;
    let finalImage = image;
    let external = true;
    try {
      const u = new URL(href);
      u.searchParams.delete('ref');
      if (/(?:www\.)?jonathanpurvis\.co\.uk$/i.test(u.hostname)) {
        finalHref = u.pathname.endsWith('/') ? u.pathname : `${u.pathname}/`;
        finalPublisher = 'Jon Purvis';
        finalIcon = '/favicon.png';
        external = false;
      } else {
        finalHref = u.toString();
        if (/github\.com$/i.test(u.hostname)) {
          finalPublisher = 'GitHub';
          finalIcon = 'https://github.githubassets.com/favicons/favicon.svg';
          const gh = u.pathname.match(
            /^\/([^/]+)\/([^/]+)(?:\/(pull|issues)\/(\d+))?/,
          );
          if (gh) {
            finalImage = gh[3]
              ? `https://opengraph.githubassets.com/1/${gh[1]}/${gh[2]}/${gh[3]}/${gh[4]}`
              : `https://opengraph.githubassets.com/1/${gh[1]}/${gh[2]}`;
          }
        } else if (!finalPublisher) {
          finalPublisher = u.hostname.replace(/^www\./, '');
        }
      }
    } catch {
      /* keep original */
    }

    const esc = (s) =>
      String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const rel = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    const iconHtml = finalIcon
      ? `<img class="bookmark-card-icon" src="${esc(finalIcon)}" alt="" width="18" height="18" loading="lazy" decoding="async" />`
      : '';
    const thumbHtml = finalImage
      ? `<div class="bookmark-card-thumbnail"><img src="${esc(finalImage)}" alt="" width="480" height="280" loading="lazy" decoding="async" /></div>`
      : '';

    return `\n\n<figure class="bookmark-card">
<a class="bookmark-card-link" href="${esc(finalHref)}"${rel}>
<div class="bookmark-card-content">
<div class="bookmark-card-title">${esc(title)}</div>
${description ? `<div class="bookmark-card-description">${esc(description)}</div>` : ''}
<div class="bookmark-card-meta">
${iconHtml}
<span class="bookmark-card-publisher">${esc(finalPublisher || 'Jon Purvis')}</span>
</div>
</div>
${thumbHtml}
</a>
</figure>\n\n`;
  },
});
turndown.addRule('twitterEmbed', {
  filter(node) {
    if (node.nodeName === 'BLOCKQUOTE' && node.classList?.contains('twitter-tweet')) {
      return true;
    }
    return (
      node.nodeName === 'FIGURE' &&
      node.classList?.contains('kg-embed-card') &&
      Boolean(node.querySelector('blockquote.twitter-tweet'))
    );
  },
  replacement(_content, node) {
    const blockquote =
      node.nodeName === 'BLOCKQUOTE'
        ? node
        : node.querySelector('blockquote.twitter-tweet');
    if (!blockquote) return '';
    const clone = blockquote.cloneNode(true);
    clone.querySelectorAll('script').forEach((el) => el.remove());
    return `\n\n${clone.outerHTML}\n\n`;
  },
});

function cleanTags(slugs) {
  const out = [];
  for (const slug of slugs) {
    if (slug.startsWith('hash-import')) continue;
    const mapped = TAG_REMAP[slug] || slug;
    if (!KEEP_TAGS.has(mapped)) continue;
    if (!out.includes(mapped)) out.push(mapped);
  }
  if (out.length === 0) out.push('general');
  return out;
}

function parseUnsplashCredit(html) {
  if (!html || !html.includes('unsplash.com')) return undefined;
  const plain = html.replace(/<[^>]+>/g, '');
  const nameMatch = plain.match(/Photo by\s+(.+?)\s*\/\s*Unsplash/i);
  const links = [...html.matchAll(/href="([^"]+)"/gi)].map((m) =>
    m[1].replace(/&amp;/g, '&'),
  );
  const profile = links.find((u) => /unsplash\.com\/@/.test(u));
  const unsplash =
    links.find((u) => /unsplash\.com\/(\?|$)/.test(u)) ||
    'https://unsplash.com/?utm_source=jonathanpurvis&utm_medium=referral';
  if (!nameMatch || !profile) return undefined;

  const normalize = (url) => {
    try {
      const u = new URL(url);
      u.searchParams.set('utm_source', 'jonathanpurvis');
      u.searchParams.set('utm_medium', 'referral');
      u.searchParams.delete('utm_campaign');
      return u.toString();
    } catch {
      return url;
    }
  };

  return {
    name: nameMatch[1].trim(),
    profile_url: normalize(profile),
    unsplash_url: normalize(unsplash),
  };
}

function makeExcerpt(post) {
  if (post.custom_excerpt?.trim()) {
    return post.custom_excerpt
      .trim()
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  const lines = (post.plaintext || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^(introduction|conclusion|summary)$/i.test(l))
    .filter((l) => !/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+$/u.test(l));
  const text = lines
    .join(' ')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return '';
  if (text.length <= 220) return text;
  return `${text.slice(0, 220).replace(/\s+\S*$/, '')}…`;
}

function resolveUrl(url) {
  if (!url) return null;
  let u = url.replace(/__GHOST_URL__/g, GHOST_ORIGIN);
  if (u.startsWith('//')) u = `https:${u}`;
  if (u.startsWith('/')) u = `${GHOST_ORIGIN}${u}`;
  return u;
}

/** Turn Ghost placeholder / absolute site links into root-relative URLs. */
function rewriteInternalLinks(markdown) {
  if (!markdown) return markdown;
  return markdown
    .replace(/__GHOST_URL__\/#\/portal\/recommendations/g, '/')
    .replace(/__GHOST_URL__\/tag\/saloon\/?/g, '/tag/saloonphp/')
    .replace(/__GHOST_URL__\/tag\/([^/\s)"']+)\/?/g, '/tag/$1/')
    .replace(/__GHOST_URL__\//g, '/')
    .replace(/__GHOST_URL__/g, '')
    .replace(
      /https?:\/\/(?:www\.)?jonathanpurvis\.co\.uk(\/(?!content\/)[^)\s"']*)/g,
      '$1',
    );
}

function isGhostHosted(url) {
  if (!url) return false;
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname.includes('unsplash.com')) return false;
    if (hostname.includes('jonathanpurvis.co.uk')) return true;
    if (hostname.includes('ghost.io') && pathname.includes('/content/images/'))
      return true;
    if (pathname.includes('/content/images/')) return true;
    return false;
  } catch {
    return false;
  }
}

function extFromUrl(url, fallback = '.jpg') {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).split('?')[0];
    if (ext && ext.length <= 5) return ext;
  } catch {
    /* ignore */
  }
  return fallback;
}

async function download(url, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  try {
    await fs.access(dest);
    return dest; // already exists
  } catch {
    /* download */
  }
  const res = await fetch(url, {
    headers: { 'User-Agent': 'jonpurvis-migration/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) {
    console.warn(`  ! failed ${res.status} ${url}`);
    return null;
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  return dest;
}

function frontmatter(obj) {
  return `---\n${yamlDump(obj, { lineWidth: 100, noRefs: true }).trim()}\n---\n`;
}

function stripGalleries(html, albumSlug) {
  if (!html) return html;
  let out = html;
  // Remove Ghost gallery / image cards when we have an album
  if (albumSlug) {
    out = out.replace(
      /<figure[^>]*class="[^"]*kg-gallery-card[^"]*"[\s\S]*?<\/figure>/gi,
      '',
    );
    out = out.replace(
      /<figure[^>]*class="[^"]*kg-image-card[^"]*"[\s\S]*?<\/figure>/gi,
      '',
    );
    out = out.replace(
      /<div[^>]*class="[^"]*kg-gallery[^"]*"[\s\S]*?<\/div>/gi,
      '',
    );
  }
  // Clean empty paragraphs
  out = out.replace(/<p>\s*<\/p>/gi, '');
  return out;
}

function extractGalleryImages(html) {
  if (!html) return [];
  const srcs = [];
  const re = /<img[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const url = resolveUrl(m[1]);
    if (url && !srcs.includes(url)) srcs.push(url);
  }
  return srcs;
}

async function rewriteHtmlImages(html, slug, imageDir) {
  if (!html) return { html: '', localImages: [] };
  const localImages = [];
  let i = 0;

  // Skip images inside Ghost bookmark cards — those stay remote / are rewritten later.
  const bookmarkRanges = [];
  const bookmarkRe =
    /<figure[^>]*class="[^"]*kg-bookmark-card[^"]*"[\s\S]*?<\/figure>/gi;
  let bm;
  while ((bm = bookmarkRe.exec(html))) {
    bookmarkRanges.push([bm.index, bm.index + bm[0].length]);
  }
  const inBookmark = (index) =>
    bookmarkRanges.some(([start, end]) => index >= start && index < end);

  const rewritten = await replaceAsync(
    html,
    /(<img[^>]+src=["'])([^"']+)(["'])/gi,
    async (full, pre, src, post, offset) => {
      if (inBookmark(offset)) return full;
      const url = resolveUrl(src);
      if (!url) return full;
      if (!isGhostHosted(url)) return `${pre}${url}${post}`;
      i += 1;
      const ext = extFromUrl(url);
      const filename = `inline-${String(i).padStart(2, '0')}${ext}`;
      const dest = path.join(imageDir, filename);
      const ok = await download(url, dest);
      if (!ok) return `${pre}${url}${post}`;
      const publicPath = `/images/posts/${slug}/${filename}`;
      localImages.push(publicPath);
      return `${pre}${publicPath}${post}`;
    },
  );
  return { html: rewritten, localImages };
}

async function replaceAsync(str, regex, asyncFn) {
  const parts = [];
  let lastIndex = 0;
  const matches = [...str.matchAll(regex)];
  for (const match of matches) {
    parts.push(str.slice(lastIndex, match.index));
    parts.push(await asyncFn(...match, match.index));
    lastIndex = match.index + match[0].length;
  }
  parts.push(str.slice(lastIndex));
  return parts.join('');
}

async function main() {
  console.log(`Reading ${exportPath}`);
  const raw = JSON.parse(await fs.readFile(exportPath, 'utf8'));
  const db = raw.db[0].data;

  const posts = db.posts.filter((p) => p.status === 'published');
  const tagsById = Object.fromEntries(db.tags.map((t) => [t.id, t]));
  const metaByPost = Object.fromEntries(
    (db.posts_meta || []).map((m) => [m.post_id, m]),
  );
  const tagsByPost = {};
  for (const pt of db.posts_tags || []) {
    const tag = tagsById[pt.tag_id];
    if (!tag) continue;
    (tagsByPost[pt.post_id] ||= []).push(tag.slug);
  }

  const blogDir = path.join(ROOT, 'src/content/blog');
  const pagesDir = path.join(ROOT, 'src/content/pages');
  const photosDir = path.join(ROOT, 'src/content/photos');
  const publicImages = path.join(ROOT, 'public/images');

  await fs.mkdir(blogDir, { recursive: true });
  await fs.mkdir(pagesDir, { recursive: true });
  await fs.mkdir(photosDir, { recursive: true });
  await fs.mkdir(path.join(publicImages, 'posts'), { recursive: true });
  await fs.mkdir(path.join(publicImages, 'photos'), { recursive: true });

  // Logo / OG defaults from live site
  const logoUrl =
    'https://storage.ghost.io/c/43/cb/43cb054d-e069-4e35-94fc-3ca586640327/content/images/2026/06/JP-2.svg';
  const ogUrl =
    'https://storage.ghost.io/c/43/cb/43cb054d-e069-4e35-94fc-3ca586640327/content/images/2026/06/JP--2--2.svg';
  await download(logoUrl, path.join(publicImages, 'logo.svg'));
  await download(ogUrl, path.join(publicImages, 'og-default.svg'));

  let postCount = 0;
  let pageCount = 0;

  for (const post of posts) {
    const slug = post.slug;
    const isPage = post.type === 'page';
    console.log(`${isPage ? 'PAGE' : 'POST'} ${slug}`);

    const imageDir = path.join(publicImages, 'posts', slug);

    // Feature image
    let featureImage = resolveUrl(post.feature_image);
    let featureCredit;
    const meta = metaByPost[post.id];
    if (meta?.feature_image_caption) {
      featureCredit = parseUnsplashCredit(meta.feature_image_caption);
    }

    if (featureImage && isGhostHosted(featureImage)) {
      const ext = extFromUrl(featureImage, '.jpg');
      const dest = path.join(imageDir, `header${ext}`);
      const ok = await download(featureImage, dest);
      if (ok) featureImage = `/images/posts/${slug}/header${ext}`;
    }

    // Gallery album extraction
    let photoAlbum;
    const albumConfig = GALLERY_ALBUMS[slug];
    let html = post.html || '';

    if (albumConfig) {
      photoAlbum = slug;
      const gallerySrcs = extractGalleryImages(html);
      const albumImageDir = path.join(publicImages, 'photos', slug);
      await fs.mkdir(albumImageDir, { recursive: true });
      const images = [];
      let n = 0;
      for (const src of gallerySrcs) {
        n += 1;
        const ext = extFromUrl(src);
        const filename = `${String(n).padStart(2, '0')}${ext}`;
        let publicPath = src;
        if (isGhostHosted(src)) {
          const dest = path.join(albumImageDir, filename);
          const ok = await download(src, dest);
          if (ok) publicPath = `/images/photos/${slug}/${filename}`;
        }
        images.push({ src: publicPath, alt: albumConfig.title });
      }
      html = stripGalleries(html, slug);

      const albumFm = {
        title: albumConfig.title,
        slug,
        date: new Date(post.published_at),
        description: albumConfig.description,
        cover: images[0]?.src || featureImage,
        images,
        related_post: slug,
      };
      const albumBody =
        frontmatter(albumFm) +
        `\nPhotos from [${albumConfig.title}](/${slug}/).\n`;
      await fs.writeFile(path.join(photosDir, `${slug}.md`), albumBody);
      console.log(`  → album with ${images.length} images`);
    }

    // Download remaining inline Ghost images
    const { html: rewrittenHtml } = await rewriteHtmlImages(html, slug, imageDir);
    let markdown = turndown.turndown(rewrittenHtml || '<p></p>');
    markdown = rewriteInternalLinks(markdown);
    markdown = markdown.replace(/\n{3,}/g, '\n\n').trim() + '\n';

    const tags = cleanTags(tagsByPost[post.id] || []);
    const excerpt = makeExcerpt(post);

    if (isPage) {
      const fm = {
        title: post.title,
        slug,
        date: new Date(post.published_at),
        excerpt: excerpt || undefined,
      };
      await fs.writeFile(
        path.join(pagesDir, `${slug}.md`),
        frontmatter(fm) + '\n' + markdown,
      );
      pageCount += 1;
      continue;
    }

    const fm = {
      title: post.title,
      slug,
      date: new Date(post.published_at),
      updated: post.updated_at ? new Date(post.updated_at) : undefined,
      tags,
      feature_image: featureImage || undefined,
      feature_image_credit: featureCredit,
      excerpt: excerpt || undefined,
      photo_album: photoAlbum,
    };
    // Drop undefined keys for cleaner YAML
    for (const key of Object.keys(fm)) {
      if (fm[key] === undefined) delete fm[key];
    }

    const dateStr = new Date(post.published_at).toISOString().slice(0, 10);
    const filename = `${dateStr}-${slug}.md`;
    await fs.writeFile(
      path.join(blogDir, filename),
      frontmatter(fm) + '\n' + markdown,
    );
    postCount += 1;
  }

  console.log(`\nDone. Posts: ${postCount}, Pages: ${pageCount}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
