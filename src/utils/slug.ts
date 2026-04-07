import type { Post } from '../types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '')
    .replaceAll(/-{2,}/g, '-');
}

export function getPostSlug(post: Post): string {
  return `${slugify(post.title)}--${post.id}`;
}


export function extractIdFromSlug(slug: string): string {
  const separatorIndex = slug.lastIndexOf('--');
  if (separatorIndex === -1) return slug;
  return slug.slice(separatorIndex + 2);
}