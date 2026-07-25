import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  TAG_LABELS,
} from '../consts';
import { sortPosts, excerptFrom, tagLabel } from '../lib/posts';

function absoluteUrl(path?: string) {
  if (!path) return undefined;
  return path.startsWith('http') ? path : new URL(path, SITE_URL).href;
}

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection('blog'));
  const lastBuildDate = (posts[0]?.data.updated ?? posts[0]?.data.date ?? new Date()).toUTCString();
  const favicon = `${SITE_URL}/favicon.png`;

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/${post.data.slug}/`;
      const description = excerptFrom(post, 220);
      const image = absoluteUrl(post.data.feature_image);
      const categories = post.data.tags
        .map((slug) => TAG_LABELS[slug] ?? tagLabel(slug))
        .map((label) => `<category><![CDATA[${label}]]></category>`)
        .join('');

      return `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <dc:creator><![CDATA[${SITE_TITLE}]]></dc:creator>
      ${categories}
      <description><![CDATA[${description}]]></description>
      ${image ? `<media:content url="${xmlEscape(image)}" medium="image"/>` : ''}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title><![CDATA[${SITE_TITLE}]]></title>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <link>${SITE_URL}/</link>
    <image>
      <url>${favicon}</url>
      <title>${SITE_TITLE}</title>
      <link>${SITE_URL}/</link>
    </image>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/rss/" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
