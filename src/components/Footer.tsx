import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-purple-500/30 py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex items-center space-x-4">
          <span className="text-purple-400 font-bold tracking-tighter italic">GAMER BLOG</span>
          <span className="text-slate-600 text-xs">© 2026 Registry</span>
        </div>

        <div className="flex items-center space-x-6 text-xs uppercase tracking-widest font-medium">
          <div className="flex items-center space-x-2 text-slate-400">
            <span>Systems Nominal</span>
          </div>
          <Link to="/" className="text-slate-500 hover:text-purple-400 transition-colors">Home</Link>
          <a href="#" className="text-slate-500 hover:text-purple-400 transition-colors">Support</a>
        </div>
        
      </div>
    </footer>
  );
};