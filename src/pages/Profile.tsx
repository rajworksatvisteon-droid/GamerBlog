
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ProfilePostCard } from '../components/ProfilePostCard';
import { EditPostModal } from '../components/EditPostModal';
import { usePostStore } from '../store/postStore';
import type { Post } from '../types';

export const Profile = () => {
  const { user } = useAuth();
  const posts = usePostStore((state) => state.posts);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const myPosts = posts.filter(p => p.author === user?.username);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
  };

  const handleCloseEdit = () => {
    setEditingPost(null);
  };

  return (
    <div className="py-10">
      <div className="bg-slate-900 p-6 rounded-lg mb-8 border border-purple-500">
        <h1 className="text-3xl font-bold">Player: {user?.username}</h1>
        <p className="text-slate-400">{user?.email}</p>
        <div className="mt-4 text-sm text-slate-500">
          Posts: {myPosts.length}
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Your Achievements (Posts)</h2>
      
      {myPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myPosts.map(post => (
            <ProfilePostCard 
              key={post.id} 
              post={post} 
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg mb-4">No posts yet!</p>
          <p>Create your first post to see it here.</p>
        </div>
      )}

      {editingPost && (
        <EditPostModal 
          post={editingPost}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};