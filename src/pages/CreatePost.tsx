import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePostStore } from '../store/postStore';


export const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '', category: 'RPG', image: '', youtubeUrl: '' });
  const addPost = usePostStore((state) => state.addPost);


  // Handle image file input and convert to base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({
      ...formData,
      id: crypto.randomUUID(),
      author: user?.username || 'Anonymous',
      createdAt: new Date().toLocaleDateString(),
      category: formData.category as any,
      image: formData.image || undefined,
      youtubeUrl: formData.youtubeUrl || undefined,
    });
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 p-8 rounded border border-slate-700">
        <h2 className="text-2xl font-bold text-purple-400">New Blog Post</h2>
        <input 
          placeholder="Title" 
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
          onChange={e => setFormData({...formData, title: e.target.value})}
          required 
        />
        <select 
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
          onChange={e => setFormData({...formData, category: e.target.value})}
        >
          <option>RPG</option><option>FPS</option><option>MMO</option>
        </select>
        <textarea
          placeholder="What's on your mind, gamer?" 
          rows={5}
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
          onChange={e => setFormData({...formData, content: e.target.value})}
          required 
        />
        <input
          type="url"
          placeholder="YouTube Video URL (optional)"
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
          value={formData.youtubeUrl}
          onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
          pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.+"
        />
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded"
          onChange={handleImageChange}
        />
        <button className="bg-purple-600 w-full py-2 font-bold rounded hover:bg-purple-500">Post to Feed</button>
      </form>
    </div>
  );
};