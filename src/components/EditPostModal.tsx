import React, { useState } from 'react';
import type { Post } from '../types';
import { usePostStore } from '../store/postStore';

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
}

export const EditPostModal = ({ post, onClose }: EditPostModalProps) => {
  const updatePost = usePostStore((state) => state.updatePost);
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    category: post.category,
    youtubeUrl: post.youtubeUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedPost: Post = {
      ...post,
      title: formData.title,
      content: formData.content,
      category: formData.category,
      youtubeUrl: formData.youtubeUrl || undefined
    };
    
    updatePost(post.id, updatedPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-purple-500 p-6 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-purple-400 mb-6">Edit Post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Title</label>
            <input 
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-white focus:border-purple-500 focus:outline-none"
              required 
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Post['category'] })}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="RPG">RPG</option>
              <option value="FPS">FPS</option>
              <option value="MMO">MMO</option>
              <option value="Indie">Indie</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-white focus:border-purple-500 focus:outline-none resize-vertical"
              required 
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">YouTube URL (optional)</label>
            <input
              type="url"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-white focus:border-purple-500 focus:outline-none"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 text-white py-3 rounded font-medium hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-purple-600 text-white py-3 rounded font-medium hover:bg-purple-500 transition-all"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};