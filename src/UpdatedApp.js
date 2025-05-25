import React, { useState, useEffect } from 'react';
import { Camera, Search, Menu, X, MessageCircle, BookOpen, Share2, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import ArticlesPage from './ArticlesPage';
import Header from './Header';
import FullScreenImage from './components/FullScreenImage';

// Logo Component with Bubbles
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

// Photo Carousel Component
const PhotoCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative h-48 w-full">
      <FullScreenImage 
        src={images[currentIndex]} 
        alt={`${title} photo ${currentIndex + 1}`} 
        className="h-48 w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <button 
          onClick={goToPrevious} 
          className="bg-blue-600 text-white p-1 rounded-full opacity-70 hover:opacity-100 transition"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={goToNext} 
          className="bg-blue-600 text-white p-1 rounded-full opacity-70 hover:opacity-100 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <span 
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-blue-600' : 'bg-white opacity-60'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ navigateToPage }) => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo and About */}
          <div>
            <RenetiumLogo />
            <p className="mt-4 text-blue-300">
              A community for photography beginners and enthusiasts to share, learn, and grow together.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigateToPage('gallery')} 
                  className="text-blue-300 hover:text-white"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToPage('articles')} 
                  className="text-blue-300 hover:text-white"
                >
                  Knowledge Base
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToPage('about')} 
                  className="text-blue-300 hover:text-white"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigateToPage('articles', '?filter=article')} 
                  className="text-blue-300 hover:text-white"
                >
                  Articles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToPage('articles', '?filter=forum')} 
                  className="text-blue-300 hover:text-white"
                >
                  Forum
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateToPage('articles', '?filter=tip')} 
                  className="text-blue-300 hover:text-white"
                >
                  Tips & Tricks
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@renetium.com" className="text-blue-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-800 text-center text-blue-400">
          <p>&copy; {new Date().getFullYear()} Renetium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Homepage Component
const HomePage = ({ navigateToPage }) => {
  // Featured photos data
  const photos = [
    { 
      id: 1, 
      title: "West India Quays", 
      author: "René", 
      likes: 245, 
      images: [
        require('./images/WestIndiaQuay.JPEG'),
        require('./images/WestIndiaQuay4.JPEG'),
        require('./images/WestIndiaQuays1.JPEG'),
        require('./images/WestIndiaQuays2.JPEG'),
        require('./images/WestIndiaQuaySunset.JPEG')
      ]
    },
    { 
      id: 2, 
      title: "Reflections", 
      author: "René", 
      likes: 187,
      images: [
        require('./images/Reflections1.JPEG'),
        require('./images/Reflections2.JPEG'),
        require('./images/Reflections3.JPEG'),
        require('./images/Reflections4.JPEG')
      ]
    },
    { 
      id: 3, 
      title: "Athens and Acropolis", 
      author: "René", 
      likes: 320,
      images: [
        require('./images/Acropolis1.JPEG'),
        require('./images/Acropolis2.JPEG'),
        require('./images/Acropolis3.JPEG'),
        require('./images/Acropolis4.JPEG'),
        require('./images/Acropolis5.JPEG'),
        require('./images/Acropolis6.JPEG'),
        require('./images/Athens.JPEG')
      ]
    },
    { 
      id: 4, 
      title: "Beautiful Places", 
      author: "René", 
      likes: 156,
      images: [
        require('./images/Valencia.JPEG'),
        require('./images/Salzburg.JPEG'),
        require('./images/Salzburg2.JPEG'),
        require('./images/StJohann.JPEG'),
        require('./images/Istanbul.JPEG'),
        require('./images/HongKong1.JPEG'),
        require('./images/HongKong2.JPEG'),
        require('./images/RomeColosseum.JPEG'),
        require('./images/VaticanStPeters.JPEG')
      ]
    }
  ];
  
  // Latest articles data
  const articles = [
    { id: 1, title: "10 Tips for Better Landscape Photography", excerpt: "Improve your landscape photography with these essential techniques..." },
    { id: 2, title: "Understanding Camera Aperture", excerpt: "Learn how aperture affects your photography and when to adjust it..." },
    { id: 3, title: "The Art of Street Photography", excerpt: "Capture compelling street scenes with these composition strategies..." }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24 px-6 text-center sm:px-10 md:px-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Renetium: A Creative Journey in Progress
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-blue-100 leading-relaxed mb-8">
            Welcome to Renetium — a space where photography meets code, and creativity meets learning.
            I built this site as a beginner exploring both the art of taking photos and the craft of building a website.
            It's not a finished product — it's a work in progress, just like the people who use it.
          </p>
          <p className="max-w-2xl mx-auto text-md sm:text-lg text-blue-200">
            Whether you're just starting out, have something to share, or want to follow along as I learn through
            trial, error, and AI-assisted guidance — you're in the right place.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigateToPage('articles')}
              className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition"
            >
              Explore Knowledge Base
            </button>
            <button
              onClick={() => navigateToPage('articles', '?filter=forum')}
              className="border border-white text-white px-6 py-3 rounded-full hover:bg-blue-800 transition"
            >
              Join the Community
            </button>
          </div>
        </section>

        <section className="bg-white px-6 py-20 text-center sm:px-10 md:px-20 lg:py-32">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Why I started Renetium
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
            I didn't set out with a big plan. I just wanted to explore photography and find a better way to learn by doing.
            Around the same time, I started getting into web development. Renetium brings those two things together — a place
            where I can share what I'm learning, practise building a site, and hopefully connect with others doing the same.
          </p>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
            Photography and coding don't seem related at first, but I've found they're both creative in different ways.
            Photography helps me look closer at the world, notice light and detail. Coding gives me the tools to build something real,
            something I can keep improving. Renetium is where those two interests meet — and evolve.
          </p>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
            This site is a work in progress, just like me. I built it using React, Tailwind CSS, GitHub, and a bit of help from AI tools.
            I'm still learning — and Renetium will grow with me as I improve. If you're curious about photography, want to share ideas,
            or just follow along, you're welcome here.
          </p>

          <div className="mt-10 text-base text-gray-600 italic">
            Built by a beginner, for beginners. Let's learn and grow together.
          </div>
        </section>

        {/* Featured Photos Section */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-8">Featured Photography</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {photos.map(photo => (
                <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {photo.images ? (
                    <PhotoCarousel images={photo.images} title={photo.title} />
                  ) : (
                    <div className="h-48 bg-blue-200 flex items-center justify-center">
                      <Camera size={48} className="text-blue-500" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-blue-700">{photo.title}</h3>
                    <p className="text-blue-600">by {photo.author}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-blue-500">{photo.likes} likes</span>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition">View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Latest Articles Section - Updated to Knowledge Base */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-8">Latest from Knowledge Base</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map(article => (
                <div key={article.id} className="border border-blue-100 rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="font-bold text-xl text-blue-700 mb-3">{article.title}</h3>
                  <p className="text-blue-900 mb-4">{article.excerpt}</p>
                  <button 
                    onClick={() => navigateToPage('articles')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read more →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Community Highlights Section */}
        <section className="py-12 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Community Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-700 bg-opacity-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Popular Forum Discussions</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Best budget lenses for portraits</span>
                    <span className="text-blue-300">32 replies</span>
                  </li>
                  <li className="flex justify-between">
                    <span>How to shoot in low light conditions</span>
                    <span className="text-blue-300">47 replies</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Post-processing workflow tips</span>
                    <span className="text-blue-300">19 replies</span>
                  </li>
                </ul>
                <button 
                  onClick={() => navigateToPage('articles', '?filter=forum')}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
                >
                  Join the conversation
                </button>
              </div>
              
              <div className="bg-blue-700 bg-opacity-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Weekly Photography Challenge</h3>
                <p className="mb-3">Current theme: "Reflections"</p>
                <p className="mb-4">Share your best photos that capture reflections in water, glass, mirrors, or any reflective surface.</p>
                <div className="flex justify-between items-center">
                  <span>Ends in 3 days</span>
                  <button 
                    onClick={() => navigateToPage('articles', '?filter=tip')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
                  >
                    Submit photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Stay Updated</h2>
            <p className="text-blue-700 mb-6">Subscribe to our newsletter for the latest photography tips and community news</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Subscribe</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Main App Component with Routing
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Handle routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (hash.includes('/articles')) {
        setCurrentPage('articles');
      } else if (hash.includes('/gallery')) {
        setCurrentPage('gallery');
      } else if (hash.includes('/about')) {
        setCurrentPage('about');
      } else {
        setCurrentPage('home');
      }
    };
    
    // Check on mount and when hash changes
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Navigation function
  const navigateToPage = (page, params = '') => {
    setCurrentPage(page);
    if (page === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = `/${page}${params}`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={navigateToPage} /> 
      {currentPage === 'home' && <HomePage navigateToPage={navigateToPage} />}
      {currentPage === 'articles' && <ArticlesPage />}
      {currentPage === 'gallery' && (
        <div className="flex-grow flex items-center justify-center bg-blue-50 p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Gallery Page</h1>
            <p className="text-gray-700 mb-6">This page is coming soon! The gallery will showcase all photography collections.</p>
            <button 
              onClick={() => navigateToPage('home')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
      
      {currentPage === 'about' && (
        <div className="flex-grow flex items-center justify-center bg-blue-50 p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-3xl">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">About Renetium</h1>
            <p className="text-gray-700 mb-4">
              Renetium started as a personal project to combine my interests in photography and web development.
              As I continue to learn both crafts, this site evolves with me.
            </p>
            <p className="text-gray-700 mb-4">
              The name "Renetium" is a blend of my name and the idea of a creative medium or element.
              Just as photographers work with light, developers work with code, and both are forms of creative expression.
            </p>
            <p className="text-gray-700 mb-6">
              This site is built using React and Tailwind CSS, with continuous improvements being made.
              Thank you for being part of this journey!
            </p>
            <button 
              onClick={() => navigateToPage('home')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
      
      <Footer navigateToPage={navigateToPage} />
</div>
  );
};
