import React, { useState } from 'react';
import { BookOpen, Search, ChevronDown, Tag, Clock, User } from 'lucide-react';
import { RenetiumLogo } from './App'; // Import the logo from App.js

// Single Article Card Component
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => (
<Link to={article.path} className="block">
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col h-full">
    <div className="h-48 bg-blue-200 flex items-center justify-center">
      <BookOpen size={32} className="text-blue-600" />
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center text-sm text-blue-500 mb-2">
        <Tag size={14} className="mr-1" />
        <span>{article.category}</span>
        <span className="mx-2">•</span>
        <Clock size={14} className="mr-1" />
        <span>{article.readTime} min read</span>
      </div>
      <h3 className="font-bold text-xl text-blue-800 mb-2 hover:underline">
        {article.title}
      </h3>
      <p className="text-blue-900 text-sm mb-4 flex-grow">{article.excerpt}</p>

      <div className="mt-auto flex items-center justify-between text-sm text-blue-600">
        <div className="flex items-center">
          <User size={16} className="mr-1" />
          <span>{article.author}</span>
        </div>
      </div>
    </div>
  </div>
</Link>
);

// Articles Page Component
const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Available article categories
  const categories = ['All','Behind the scenes','Tutorials', 'Gear Reviews', 'Techniques', 'Inspiration', 'News'];
  
  // Sample article data
  const articles = [
    {
      id: 1,
      title: "Why I started Renetium",
      excerpt: "How a beginner’s photography and coding journey turned into a shared learning project.",
      author: "René",
      category: "Behind the scenes",
      path: "/articles/why-i-started-renetium",
      readTime: 5,
      date: "May 01, 2025",
      image: "/images/why-i-started-renetium.jpg"
    },
    {
      id: 2,
      title: "Review: Canon EOS R7 for Wildlife Photography",
      excerpt: "We tested the latest Canon mirrorless offering in the field. Here's our comprehensive review for wildlife photographers.",
      author: "Michael Chen",
      category: "Gear Reviews",
      readTime: 12,
      date: "Apr 10, 2025"
    },
    {
      id: 3,
      title: "Understanding Exposure Triangle: A Beginner's Guide",
      excerpt: "Learn how aperture, shutter speed, and ISO work together to create the perfect exposure for your photographs.",
      author: "Sarah Williams",
      category: "Tutorials",
      readTime: 10,
      date: "Apr 5, 2025"
    },
    {
      id: 4,
      title: "Capturing the Milky Way: Guide to Astrophotography",
      excerpt: "From planning to post-processing, discover how to capture breathtaking images of the night sky with your camera.",
      author: "David Miller",
      category: "Techniques",
      readTime: 15,
      date: "Mar 28, 2025"
    },
    {
      id: 5,
      title: "Finding Your Photography Style",
      excerpt: "Developing a unique style is crucial for standing out as a photographer. Learn how to discover your visual voice.",
      author: "Lisa Taylor",
      category: "Inspiration",
      readTime: 7,
      date: "Mar 22, 2025"
    },
    {
      id: 6,
      title: "The Art of Composition: Beyond Rule of Thirds",
      excerpt: "While the rule of thirds is a starting point, explore advanced composition techniques to elevate your photography.",
      author: "James Wilson",
      category: "Techniques",
      readTime: 9,
      date: "Mar 18, 2025"
    }
  ];
  
  // Filter articles based on category and search query
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Photography Articles & Tutorials</h1>
          <p className="text-xl max-w-3xl mx-auto">Discover tips, techniques, and insights to improve your photography skills</p>
        </div>
      </section>
      
      {/* Filters and Search */}
      <section className="py-8 bg-white shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-auto">
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-blue-50 px-4 py-2 pr-10 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 w-full md:w-auto"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-blue-500 pointer-events-none" />
              </div>
            </div>
            
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800"
              />
              <Search size={16} className="absolute left-3 top-3 text-blue-500" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl text-blue-800 mb-2">No articles found</h3>
                <p className="text-blue-600">Try adjusting your search or category filters</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 bg-blue-100">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Never Miss an Article</h2>
          <p className="text-blue-700 mb-6">Subscribe to our weekly digest of the best photography content</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Subscribe</button>
          </div>
        </div>
      </section>
      
      {/* Footer (simplified version) */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <RenetiumLogo />
          <p className="mt-4 text-blue-300">A community for photography enthusiasts</p>
          <p className="mt-8 text-blue-400">&copy; {new Date().getFullYear()} Renetium. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Articles;
