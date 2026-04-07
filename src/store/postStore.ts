import { create } from 'zustand';
import type { Post } from '../types';

const STORAGE_KEY = 'gamer_blog_posts';

interface PostStore {
  posts: Post[];
  getPosts: () => Post[];
  addPost: (post: Post) => void;
  updatePost: (id: string, updatedPost: Post) => void;
  deletePost: (id: string) => void;
  hydrate: () => void;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  getPosts: () => get().posts,
  addPost: (post) => {
    const updated = [post, ...get().posts];
    set({ posts: updated });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  updatePost: (id, updatedPost) => {
    const updated = get().posts.map((p) => (p.id === id ? updatedPost : p));
    set({ posts: updated });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  deletePost: (id) => {
    const updated = get().posts.filter((p) => p.id !== id);
    set({ posts: updated });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  hydrate: async () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        set({ posts: JSON.parse(stored) });
        return;
      } catch (e) {
      }
    }
    try {
      const response = await fetch('/posts.json');
      if (response.ok) {
        const defaultPosts = await response.json();
        set({ posts: defaultPosts });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
      }
    } catch (error) {
      console.warn('Failed to load default posts:', error);
      set({ posts: [] });
    }
  },
}));

usePostStore.getState().hydrate();
