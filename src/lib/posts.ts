import type { CollectionEntry } from 'astro:content';
import { TAGS } from '../data/tags';
import { TAG_LABELS } from '../consts';

export function tagLabel(slug: string): string {
  return TAGS[slug]?.name ?? TAG_LABELS[slug] ?? slug;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Europe/Dublin',
  });
}

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function excerptFrom(post: CollectionEntry<'blog'>, max = 65): string {
  const source =
    post.data.excerpt?.trim() ||
    (() => {
      const raw = post.body ?? '';
      return raw
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
        .replace(/\[[^\]]*\]\([^)]+\)/g, '$1')
        .replace(/[#>*_`~\-]/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    })();

  const plain = source.replace(/\s+/g, ' ').trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

export function sortPosts(posts: CollectionEntry<'blog'>[]) {
  return posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function primaryTag(tags: string[]): string | undefined {
  const priority = [
    'conferences',
    'elephpants',
    'packages',
    'pestphp',
    'saloonphp',
    'ai',
    'speaking',
    'music',
    'development',
    'general',
  ];
  for (const slug of priority) {
    if (tags.includes(slug)) return slug;
  }
  return tags[0];
}
