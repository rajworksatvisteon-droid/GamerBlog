

import { useState } from 'react';
import { PostCard } from '../components/PostCard';
import { usePostStore } from '../store/postStore';
import SearchBar from '../components/SearchBar';

export const Home = () => {
  const posts = usePostStore((state) => state.posts);
  const [query, setQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const q = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      (post.content && post.content.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-8">
      <div className="max-w-lg mx-auto mb-6">
        <SearchBar query={query} setQuery={setQuery} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-slate-400">No posts found. Try a different search!</p>
        )}
      </div>
    </div>
  );
};