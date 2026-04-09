import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-xl border-b-2 border-purple-500 sticky top-0 z-40">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-purple-400 italic">GAMER BLOG</Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <Link to="/whats-new" className="hover:text-purple-400 transition-colors">What's New</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/create" className="hover:text-purple-400">Create Post</Link>              <Link to="/posts" className="hover:text-purple-400">My Posts</Link>              <Link to="/profile" className="hover:text-purple-400">Profile</Link>
              <button 
                onClick={() => setShowLogoutModal(true)} // Open pop-up
                className="bg-red-600 px-4 py-1.5 rounded font-medium hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-purple-400">Login</Link>
              <Link to="/signup" className="bg-purple-600 px-4 py-1.5 rounded font-bold hover:bg-purple-500">Join Now</Link>
            </div>
          )}
        </div>
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-purple-500 p-8 rounded-lg shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold text-white mb-4 italic">Log Out?</h3>
            <p className="text-slate-400 mb-8">Are you sure you want to log out of your session?</p>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-slate-700 text-white py-2 rounded font-bold hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmLogout}
                className="flex-1 bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/40"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};