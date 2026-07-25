import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../consts';
import { sortPosts, excerptFrom } from '../lib/posts';

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection('blog')).slice(0, 50);

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/${post.data.slug}/`;
      const description = excerptFrom(post).replace(/&/g, '&amp;').replace(/</g, '&lt;');
      return `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <description>${SITE_DESCRIPTION}</description>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
