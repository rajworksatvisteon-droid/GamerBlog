import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { CreatePost } from './pages/CreatePost';
import { Profile } from './pages/Profile';
import { PostDetail } from './pages/PostDetail';
import { ProtectedRoute } from './components/ProtectedRoute';
import WhatsNew from './pages/WhatsNew';

function App() {
  return (
    <Router>
        <div className="flex flex-col min-h-screen bg-slate-800 text-slate-100">
          <Navbar />
          <main className="grow container mx-auto px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/whats-new" element={<WhatsNew />} />
              <Route 
                path="/post/:slug" 
                element={
                  <ProtectedRoute>
                    <PostDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create" 
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="*" 
                element={
                  <div className="py-20 text-center">
                    <h1 className="text-4xl font-black text-purple-500">404</h1>
                    <p className="text-slate-400 mt-2">Map territory not found. Return to base.</p>
                  </div>
                } 
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
  );
}

export default App;