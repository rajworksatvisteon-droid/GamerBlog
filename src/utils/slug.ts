import type { Post } from '../types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '')
    .replaceAll(/-{2,}/g, '-');
}

// Returns a slug like: my-post-title-abc123
export function getPostSlug(post: Post): string {
  // Use first 6 chars of id for uniqueness
  const idPart = post.id.slice(0, 6);
  return `${slugify(post.title)}-${idPart}`;
}

// Extracts the id part from a slug
export function extractIdFromSlug(slug: string): string {
  // Assumes id is after last hyphen
  const lastDash = slug.lastIndexOf('-');
  if (lastDash === -1) return slug;
  return slug.slice(lastDash + 1);
}