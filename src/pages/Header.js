import React, { useState, useEffect } from 'react';
import { Camera, Search, Menu, X, BookOpen, Info, ChevronDown } from 'lucide-react';
import { RenetiumLogo } from './App';

const Header = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll for adding shadow to header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navigate = (page) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = `/${page}`;
    }
    setMobileMenuOpen(false);
  };
  
  return (
    <header className={`sticky top-0 z-50 bg-blue-900 text-white ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => navigate('home')} className="flex items-center">
              <RenetiumLogo />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => navigate('home')} 
              className={`hover:text-blue-200 flex items-center ${currentPage === 'home' ? 'text-blue-300' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('gallery')} 
              className={`hover:text-blue-200 flex items-center ${currentPage === 'gallery' ? 'text-blue-300' : ''}`}
            >
              <Camera size={18} className="mr-1" /> Gallery
            </button>
            <button 
              onClick={() => navigate('articles')} 
              className={`hover:text-blue-200 flex items-center ${currentPage === 'articles' ? 'text-blue-300' : ''}`}
            >
              <BookOpen size={18} className="mr-1" /> Knowledge Base
            </button>
            <button 
              onClick={() => navigate('about')} 
              className={`hover:text-blue-200 flex items-center ${currentPage === 'about' ? 'text-blue-300' : ''}`}
            >
              <Info size={18} className="mr-1" /> About
            </button>
          </nav>
          
          {/* Search and Mobile Menu Trigger */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-blue-800 transition md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-800 pb-4">
          <nav className="container mx-auto px-6 py-2 flex flex-col space-y-3">
            <button 
              onClick={() => navigate('home')} 
              className={`p-2 rounded hover:bg-blue-700 ${currentPage === 'home' ? 'bg-blue-700' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('gallery')} 
              className={`p-2 rounded hover:bg-blue-700 flex items-center ${currentPage === 'gallery' ? 'bg-blue-700' : ''}`}
            >
              <Camera size={18} className="mr-2" /> Gallery
            </button>
            <button 
              onClick={() => navigate('articles')} 
              className={`p-2 rounded hover:bg-blue-700 flex items-center ${currentPage === 'articles' ? 'bg-blue-700' : ''}`}
            >
              <BookOpen size={18} className="mr-2" /> Knowledge Base
            </button>
            <button 
              onClick={() => navigate('about')} 
              className={`p-2 rounded hover:bg-blue-700 flex items-center ${currentPage === 'about' ? 'bg-blue-700' : ''}`}
            >
              <Info size={18} className="mr-2" /> About
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
