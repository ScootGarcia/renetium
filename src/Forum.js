import React, { useState } from 'react';
import { MessageCircle, Users, Clock, ChevronDown, Search, Eye, ThumbsUp } from 'lucide-react';

// Topic Card Component
const TopicCard = ({ topic }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md p-4 border border-blue-100">
    <div className="flex">
      <div className="mr-4 mt-1">
        <div className={`p-2 rounded-full ${topic.pinned ? 'bg-blue-100 text-blue-600' : 'bg-blue-50 text-blue-500'}`}>
          <MessageCircle size={20} />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex gap-2 mb-1">
          {topic.pinned && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Pinned</span>}
          {topic.isNew && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">New</span>}
          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">{topic.category}</span>
        </div>
        <h3 className="font-bold text-lg text-blue-800 mb-2">{topic.title}</h3>
        <p className="text-blue-700 text-sm mb-3">{topic.excerpt}</p>
        <div className="flex flex-wrap items-center text-sm text-blue-500 gap-3">
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>{topic.replies} replies</span>
          </div>
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{topic.views} views</span>
          </div>
          <div className="flex items-center ml-auto">
            <Clock size={14} className="mr-1" />
            <span>{topic.lastActivity}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Forum Page Component
const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Available forum categories
  const categories = ['All', 'Gear Discussion', 'Technique', 'Post-Processing', 'Critiques', 'General'];
  
  // Sample topic data
  const topics = [
    {
      id: 1,
      title: "Best budget lenses for portrait photography?",
      excerpt: "Looking for affordable lenses for professional-looking portraits under $500.",
      category: "Gear Discussion",
      replies: 32,
      views: 1458,
      likes: 24,
      lastActivity: "2 hours ago",
      pinned: true,
      isNew: false
    },
    {
      id: 2,
      title: "How to shoot in low light without expensive gear",
      excerpt: "Struggling with low light photography. What techniques work with entry-level equipment?",
      category: "Technique",
      replies: 47,
      views: 2103,
      likes: 56,
      lastActivity: "4 hours ago",
      pinned: false,
      isNew: true
    },
    {
      id: 3,
      title: "Post-processing workflow tips",
      excerpt: "What's your editing workflow? Looking to streamline mine for efficiency.",
      category: "Post-Processing",
      replies: 19,
      views: 876,
      likes: 12,
      lastActivity: "Yesterday",
      pinned: false,
      isNew: false
    },
    {
      id: 4,
      title: "Critique my latest landscape series",
      excerpt: "Just finished a series of mountain landscapes. Would appreciate constructive feedback.",
      category: "Critiques",
      replies: 8,
      views: 342,
      likes: 15,
      lastActivity: "2 days ago",
      pinned: false,
      isNew: false
    },
    {
      id: 5,
      title: "First camera for a beginner photographer?",
      excerpt: "Complete beginner looking for camera recommendations to start photography.",
      category: "Gear Discussion",
      replies: 53,
      views: 1890,
      likes: 27,
      lastActivity: "3 days ago",
      pinned: false,
      isNew: false
    }
  ];
  
  // Filter topics based on category and search query
  const filteredTopics = topics.filter(topic => {
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         topic.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-3">Photography Forums</h1>
          <p className="text-lg max-w-2xl mx-auto">Join discussions with fellow photographers and share your knowledge</p>
        </div>
      </section>
      
      {/* Filters and Search */}
      <section className="py-6 bg-white shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-auto">
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-blue-50 px-4 py-2 pr-10 rounded-lg border border-blue-200 focus:outline-none text-blue-800 w-full md:w-auto"
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
                placeholder="Search topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-blue-200 focus:outline-none text-blue-800"
              />
              <Search size={16} className="absolute left-3 top-3 text-blue-500" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Create Topic Button */}
      <div className="container mx-auto px-6 py-4">
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ml-auto">
          <span className="mr-2">New Topic</span>
          <span className="bg-white text-blue-600 rounded-full h-6 w-6 flex items-center justify-center">+</span>
        </button>
      </div>
      
      {/* Topics List */}
      <section className="py-4 mb-8">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            {filteredTopics.length > 0 ? (
              filteredTopics.map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg">
                <h3 className="text-xl text-blue-800 mb-2">No topics found</h3>
                <p className="text-blue-600">Try adjusting your search or create a new topic</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer (minimal) */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-blue-300">Renetium Photography Forums</p>
          <p className="mt-2 text-blue-400">&copy; {new Date().getFullYear()} Renetium</p>
        </div>
      </footer>
    </div>
  );
};

export default Forum;
