
import { useAuth } from '../context/AuthContext';
import { usePostStore } from '../store/postStore';

export const Profile = () => {
  const { user } = useAuth();
  const posts = usePostStore((state) => state.posts);
  const myPosts = posts.filter(p => p.author === user?.username);

  return (
    <div className="py-10">
      <div className="bg-slate-900 p-6 rounded-lg mb-8 border border-purple-500">
        <h1 className="text-3xl font-bold">Player Profile</h1>
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
              <p className="text-slate-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 p-6 rounded-lg border border-purple-500">
        <h3 className="text-lg font-bold mb-2 text-white">About</h3>
        <p className="text-slate-300">
          Welcome to my gaming profile! I'm passionate about sharing gaming experiences, 
          reviews, and insights with the community. Check out my posts to see what I've been playing lately.
        </p>
      </div>
    </div>
  );
};