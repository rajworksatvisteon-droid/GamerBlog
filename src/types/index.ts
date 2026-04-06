export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'RPG' | 'FPS' | 'MMO' | 'Indie';
  createdAt: string;
  image?: string; // base64 or URL
  youtubeUrl?: string;
}