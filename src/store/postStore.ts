import { create } from 'zustand';
import type { Post } from '../types';

const STORAGE_KEY = 'gamer_blog_posts';

interface PostStore {
  posts: Post[];
  getPosts: () => Post[];
  addPost: (post: Post) => void;
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
  deletePost: (id) => {
    const updated = get().posts.filter((p) => p.id !== id);
    set({ posts: updated });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  hydrate: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        set({ posts: JSON.parse(stored) });
      } catch (e) {
        set({ posts: [] });
      }
    }
  },
}));

usePostStore.getState().hydrate();
