import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Camera, Search, Menu, X, MessageCircle, BookOpen, Share2, Info } from 'lucide-react';

// Import page components
import App from './App';
import Articles from './pages/Articles';
import Forum from './Forum';
import WhyIStartedRenetium from './pages/WhyIStartedRenetium';

// Logo Component (exported to be used in other components)
export const RenetiumLogo = () => (
  <div className="flex items-center">
    <div className="relative mr-2">
      <div className="absolute w-6 h-6 bg-blue-500 rounded-full opacity-70 top-0 left-0"></div>
      <div className="absolute w-4 h-4 bg-blue-300 rounded-full opacity-80 top-2 left-3"></div>
      <div className="absolute w-3 h-3 bg-blue-200 rounded-full opacity-90 top-4 left-1"></div>
      <div className="w-8 h-8"></div>
    </div>
    <span className="text-2xl font-bold text-blue-600">Renetium</span>
  </div>
);

// Navigation Links Component
const NavLinks = () => (
  <>
    <Link to="/" className="hover:text-blue-200 flex items-center">
      <Camera size={18} className="mr-1" /> Home
    </Link>
    <Link to="/articles" className="hover:text-blue-200 flex items-center">
      <BookOpen size={18} className="mr-1" /> Articles
    </Link>
    <Link to="/forum" className="hover:text-blue-200 flex items-center">
      <MessageCircle size={18} className="mr-1" /> Forum
    </Link>
    <Link to="/tips" className="hover:text-blue-200 flex items-center">
      <Share2 size={18} className="mr-1" /> Tips & Tricks
    </Link>
    <Link to="/about" className="hover:text-blue-200 flex items-center">
      <Info size={18} className="mr-1" /> About
    </Link>
  </>
);

// Header Component with Navigation
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <RenetiumLogo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </div>
          
          <div className="hidden md:flex">
            <button className="p-2 rounded-full hover:bg-blue-600 transition">
              <Search size={20} />
            </button>
          </div>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-blue-800 text-white ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-4 p-4">
          <NavLinks />
          <div className="relative mt-2">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-4 py-2 pl-10 rounded-lg text-blue-900 focus:outline-none"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-blue-400" />
          </div>
        </div>
      </div>
    </>
  );
};

// Main Router Component
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/articles/why-i-started-renetium" element={<WhyIStartedRenetium />} />
        <Route path="/tips" element={<div className="min-h-screen flex items-center justify-center bg-blue-50">
          <h1 className="text-3xl font-bold text-blue-700">Coming Soon: Photography Tips & Tricks</h1>
        </div>} />
        <Route path="/about" element={<div className="min-h-screen flex items-center justify-center bg-blue-50">
          <h1 className="text-3xl font-bold text-blue-700">About Renetium - Coming Soon</h1>
        </div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
