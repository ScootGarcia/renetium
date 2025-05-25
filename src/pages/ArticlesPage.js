import React, { useState, useEffect } from 'react';
import { Search, BookOpen, MessageCircle, Share2, ChevronDown, X, Maximize } from 'lucide-react';
import { RenetiumLogo } from '../App';

// Full Screen Modal Component for Article Images
const ArticleImageModal = ({ isOpen, onClose, image, title }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;
      
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
      >
        <X size={32} />
      </button>

      {/* Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-white text-xl font-bold text-center px-4">
        {title}
      </div>

      {/* Main image */}
      <div className="relative w-full h-full flex items-center justify-center px-16">
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

// Enhanced Content Item Component with Image Support
const ContentItem = ({ item, isExpanded, onToggle }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openImageModal = () => {
    if (item.image) {
      setIsImageModalOpen(true);
    }
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // Type icons
  const typeIcons = {
    article: <BookOpen size={18} />,
    tip: <Share2 size={18} />,
    forum: <MessageCircle size={18} />
  };
  
  // Type labels
  const typeLabels = {
    article: 'Article',
    tip: 'Tip & Trick',
    forum: 'Forum Discussion'
  };
  
  // Type colors
  const typeColors = {
    article: 'bg-blue-100 text-blue-800',
    tip: 'bg-green-100 text-green-800',
    forum: 'bg-purple-100 text-purple-800'
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Hero Image */}
        {item.image && (
          <div className="relative h-64 bg-gray-200 overflow-hidden group cursor-pointer" onClick={openImageModal}>
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay with full screen icon */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-20 p-3 rounded-full">
                <Maximize size={32} className="text-white" />
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${typeColors[item.type]}`}>
                  {typeIcons[item.type]}
                  <span className="ml-1">{typeLabels[item.type]}</span>
                </span>
                <span className="text-gray-500 text-sm">{formatDate(item.date)}</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">{item.title}</h2>
              <p className="text-gray-700">{item.excerpt}</p>
            </div>
            <button 
              className="text-blue-600 hover:text-blue-800 flex items-center ml-4 flex-shrink-0"
              onClick={() => onToggle(item.id)}
            >
              {isExpanded ? 'Close' : 'Read more'} 
              <ChevronDown 
                size={16} 
                className={`ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>
          
          {/* Article Stats */}
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="mr-4">By {item.author}</span>
            <span className="mr-4">{item.likes} likes</span>
            <span>{item.comments} comments</span>
          </div>
          
          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: item.content }}></div>
              
              {/* Comments section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Comments</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2" 
                    placeholder="Add a comment..."
                    rows={3}
                  ></textarea>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Submit Comment</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Modal */}
      <ArticleImageModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        image={item.image}
        title={item.title}
      />
    </>
  );
};

const ArticlesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticle, setExpandedArticle] = useState(null);
  
  // Add this useEffect for URL parameter handling
  useEffect(() => {
    // Check for filter parameter in URL
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const filterParam = urlParams.get('filter');
    
    if (filterParam && ['article', 'tip', 'forum'].includes(filterParam)) {
      setActiveFilter(filterParam);
    }
    
    // Check for search parameter in URL
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

  // Combined content from all sections with images
  const allContent = [
    // Articles
    { 
      id: 'article-1', 
      type: 'article',
      title: '10 Tips for Better Landscape Photography', 
      author: 'René',
      date: '2025-04-10',
      excerpt: 'Improve your landscape photography with these essential techniques...',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center',
      content: `
        <p>Landscape photography is all about capturing the beauty of our natural world. Here are 10 tips to help you take your landscape photography to the next level:</p>
        
        <h3>1. Golden Hour is Your Friend</h3>
        <p>Shoot during the golden hours – shortly after sunrise or before sunset – when the light is soft, warm, and directional.</p>
        
        <h3>2. Use a Tripod</h3>
        <p>A sturdy tripod is essential for landscape photography, especially in low light conditions or when you want to use smaller apertures for greater depth of field.</p>
        
        <h3>3. Find a Compelling Foreground</h3>
        <p>Great landscape photos often have an interesting foreground element that leads the viewer's eye into the scene.</p>
        
        <h3>4. Master the Rule of Thirds</h3>
        <p>Place key elements along the grid lines or at their intersections to create a balanced, visually appealing composition.</p>
        
        <h3>5. Use a Small Aperture</h3>
        <p>To ensure sharpness throughout your image, use a small aperture (high f-number) like f/11 or f/16.</p>
        
        <h3>6. Consider Using Filters</h3>
        <p>Neutral density and graduated neutral density filters can help balance exposure between bright skies and darker foregrounds.</p>
        
        <h3>7. Focus One-Third Into the Scene</h3>
        <p>For maximum depth of field, focus about one-third of the way into your scene rather than on the closest or furthest element.</p>
        
        <h3>8. Be Patient</h3>
        <p>Great landscape photography often requires waiting for the perfect light, weather conditions, or passing clouds.</p>
        
        <h3>9. Include Scale</h3>
        <p>Adding a person or recognizable object can provide scale and context to showcase the grandeur of a landscape.</p>
        
        <h3>10. Post-Processing Matters</h3>
        <p>Learn basic editing techniques to enhance the mood and impact of your landscape photos without overdoing it.</p>
      `,
      likes: 124,
      comments: 42
    },
    { 
      id: 'article-2', 
      type: 'article',
      title: 'Understanding Camera Aperture', 
      author: 'René',
      date: '2025-03-28',
      excerpt: 'Learn how aperture affects your photography and when to adjust it...',
      image: 'https://images.unsplash.com/photo-1606146485652-8b113e2dff17?w=800&h=400&fit=crop&crop=center',
      content: `
        <p>Aperture is one of the three pillars of photography (along with shutter speed and ISO) and is arguably the most important. Here's what you need to know:</p>
        
        <h3>What is Aperture?</h3>
        <p>Aperture refers to the opening in your lens through which light passes to enter the camera. It's expressed in f-numbers (like f/2.8, f/4, f/5.6), with smaller numbers representing larger openings.</p>
        
        <h3>How Aperture Affects Exposure</h3>
        <p>A larger aperture (smaller f-number) lets in more light, resulting in a brighter image. A smaller aperture (larger f-number) restricts light, creating a darker image.</p>
        
        <h3>Depth of Field</h3>
        <p>Perhaps the most creative aspect of aperture is its effect on depth of field. A large aperture (f/1.8) creates a shallow depth of field, perfect for portraits where you want the subject sharp and the background blurred. A small aperture (f/16) keeps more of the scene in focus, ideal for landscapes.</p>
        
        <h3>When to Use Different Apertures</h3>
        <p>For portraits: Use wide apertures (f/1.4-f/4) to blur backgrounds and make subjects stand out.</p>
        <p>For landscapes: Use narrow apertures (f/8-f/16) to keep everything from foreground to background sharp.</p>
        <p>For low light: Use wider apertures to gather more light without having to slow shutter speed too much.</p>
        
        <h3>The Sweet Spot</h3>
        <p>Most lenses have a "sweet spot" (usually around f/8 or f/11) where they produce the sharpest images with minimal distortion or diffraction.</p>
      `,
      likes: 98,
      comments: 23
    },
    { 
      id: 'article-3', 
      type: 'article',
      title: 'The Art of Street Photography', 
      author: 'René',
      date: '2025-03-15',
      excerpt: 'Capture compelling street scenes with these composition strategies...',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop&crop=center',
      content: `
        <p>Street photography captures everyday life in public places. It's about finding extraordinary moments in ordinary situations.</p>
        
        <h3>Be Observant</h3>
        <p>The best street photographers are keen observers who notice subtle expressions, interesting light, and unique moments that others miss.</p>
        
        <h3>Choose the Right Equipment</h3>
        <p>A small, discreet camera is often preferable for street photography. Many professionals use compact cameras or smaller mirrorless systems that don't intimidate subjects.</p>
        
        <h3>Master Zone Focusing</h3>
        <p>Learn to pre-focus your camera to a specific distance (zone focusing) so you can shoot quickly without waiting for autofocus.</p>
        
        <h3>Embrace Interesting Light</h3>
        <p>Look for dramatic shadows, light beams through buildings, or reflections that can add atmosphere to your images.</p>
        
        <h3>Be Respectful</h3>
        <p>While laws vary by country, always be respectful of your subjects. If someone objects to being photographed, honor their wishes.</p>
      `,
      likes: 156,
      comments: 37
    },
    
    // Tips & Tricks
    { 
      id: 'tip-1', 
      type: 'tip',
      title: 'How to Clean Your Camera Sensor Safely',
      author: 'René',
      date: '2025-04-25',
      excerpt: 'A step-by-step guide to cleaning your camera sensor without damaging it...',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=400&fit=crop&crop=center',
      content: `
        <p>Dust on your camera sensor can be a persistent problem, showing up as dark spots in your images. Here's how to clean your sensor safely:</p>
        
        <h3>When to Clean Your Sensor</h3>
        <p>If you notice persistent spots in the same location across multiple images (especially noticeable in photos of uniform subjects like blue skies), it's likely sensor dust.</p>
        
        <h3>Safety First</h3>
        <p>Always work in a clean, dust-free environment. Wash your hands thoroughly and have all your cleaning tools ready before opening your camera.</p>
        
        <h3>Method 1: Air Blower</h3>
        <p>Start with the least invasive method: a rubber air blower (not compressed air cans). Set your camera to sensor cleaning mode, hold it face down, and use the blower to dislodge loose particles.</p>
        
        <h3>Method 2: Sensor Swabs</h3>
        <p>If dust remains, specialized sensor swabs with cleaning solution are your next option. Use swabs designed specifically for your sensor size, and make single, gentle swipes across the sensor.</p>
        
        <h3>When to Seek Professional Help</h3>
        <p>If you're uncomfortable cleaning your sensor or if dust persists after your attempts, take your camera to a professional service center.</p>
      `,
      likes: 87,
      comments: 19
    },
    { 
      id: 'tip-2', 
      type: 'tip',
      title: 'Perfect Your White Balance Every Time', 
      author: 'René',
      date: '2025-04-15',
      excerpt: 'Simple techniques to ensure accurate colors in any lighting condition...',
      image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=800&h=400&fit=crop&crop=center',
      content: `
        <p>White balance can make or break your photos by affecting the overall color tone. Here's how to get it right:</p>
        
        <h3>Understanding White Balance</h3>
        <p>White balance adjusts the color temperature of your image to make white objects appear white, regardless of the lighting conditions.</p>
        
        <h3>Using Presets</h3>
        <p>Most cameras have white balance presets like Daylight, Cloudy, Shade, Tungsten, and Fluorescent. These are good starting points for common lighting situations.</p>
        
        <h3>Custom White Balance</h3>
        <p>For precise results, use your camera's custom white balance feature with a gray card or white balance card. Simply take a photo of the card under your current lighting and set it as your reference.</p>
        
        <h3>White Balance for Creative Effect</h3>
        <p>"Correct" white balance isn't always the goal. Sometimes a warmer or cooler tone can enhance the mood of your image.</p>
        
        <h3>Shoot in RAW</h3>
        <p>If you're unsure, shooting in RAW gives you the flexibility to adjust white balance during post-processing without quality loss.</p>
      `,
      likes: 62,
      comments: 15
    },
    
    // Forum Discussions
    { 
      id: 'forum-1', 
      type: 'forum',
      title: 'Best budget lenses for portraits?', 
      author: 'PhotoNewbie23',
      date: '2025-05-01',
      excerpt: 'Looking for affordable lens recommendations for taking better portraits...',
      image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&h=400&fit=crop&crop=center',
      content: `
        <p class="forum-post">
          <span class="author">PhotoNewbie23:</span>
          I've been using my kit lens (18-55mm) for everything, but I'd like to get better at portraits. What's a good affordable lens that will help me get those nice blurry backgrounds? I have a Canon EOS Rebel T7i. Budget is around $300.
        </p>
        
        <p class="forum-reply">
          <span class="author">René:</span>
          The Canon EF 50mm f/1.8 STM (often called the "nifty fifty") would be perfect for you. It's around $125 new, has a wide aperture for great background blur, and is surprisingly sharp for the price. It's a staple in almost every Canon photographer's bag.
        </p>
        
        <p class="forum-reply">
          <span class="author">LensGuru:</span>
          I'll second the 50mm f/1.8 recommendation. If you want something a bit longer for portraits (which can be more flattering), the EF 85mm f/1.8 USM is another great option, though it's at the top of your budget at around $300.
        </p>
        
        <p class="forum-reply">
          <span class="author">PortraitPro:</span>
          Don't overlook vintage lenses! You can find old manual focus lenses like the Helios 44-2 58mm f/2 for under $100 plus an adapter. They have incredible character and produce beautiful, swirly bokeh.
        </p>
      `,
      likes: 32,
      comments: 8
    },
    { 
      id: 'forum-2', 
      type: 'forum',
      title: 'How to shoot in low light conditions?', 
      author: 'NightPhotog',
      date: '2025-04-20',
      excerpt: 'Struggling with blurry and noisy photos when shooting indoors or at night...',
      image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop&crop=center',
      content: `
        <p class="forum-post">
          <span class="author">NightPhotog:</span>
          I'm having trouble with indoor and night photography. My photos always come out either too dark, too blurry, or extremely noisy when I boost the ISO. Any tips for shooting in low light?
        </p>
        
        <p class="forum-reply">
          <span class="author">LowLightMaster:</span>
          First, use the widest aperture your lens allows (lowest f-number). Second, find the highest ISO you're comfortable with - modern cameras can handle ISO 1600-3200 pretty well. Third, stabilize your camera (tripod or steady surface) if possible. Finally, consider using flash with a diffuser for indoor shots.
        </p>
        
        <p class="forum-reply">
          <span class="author">René:</span>
          Adding to the above, slow shutter speeds are fine if nothing's moving AND you have stabilization (in-lens or in-body). Try the reciprocal rule as a starting point: your shutter speed shouldn't be slower than 1/(focal length). So with a 50mm lens, try not to go below 1/50s handheld.
        </p>
        
        <p class="forum-reply">
          <span class="author">TripodFan:</span>
          Don't be afraid to use a tripod and longer exposures for static scenes. With a remote shutter release or timer, you can use base ISO and smaller apertures while still getting plenty of light with a longer exposure.
        </p>
      `,
      likes: 47,
      comments: 12
    },
    { 
      id: 'forum-3', 
      type: 'forum',
      title: 'Post-processing workflow tips', 
      author: 'EditingBeginner',
      date: '2025-04-05',
      excerpt: 'Looking for a simple but effective post-processing routine for my photos...',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e732b2b9?w=800&h=400&fit=crop&crop=center',
      content: `
        <p class="forum-post">
          <span class="author">EditingBeginner:</span>
          I'm overwhelmed by all the post-processing options! Could someone share a basic workflow for editing photos? I'm using Lightroom Classic and occasionally Photoshop. Just need a starting point that's not too complicated.
        </p>
        
        <p class="forum-reply">
          <span class="author">LrWizard:</span>
          Here's my simple Lightroom workflow:
          1. Basic adjustments: Exposure, contrast, highlights, shadows
          2. White balance correction if needed
          3. Clarity, vibrance, and saturation (use sparingly)
          4. Crop and straighten
          5. Lens corrections
          6. Local adjustments (brush, graduated filters) if needed
          7. Final tweaks to exposure, contrast
          
          Start with this and develop your own style over time!
        </p>
        
        <p class="forum-reply">
          <span class="author">René:</span>
          I recommend creating a preset once you find settings you like. I have a few basic starting points - one for landscapes, one for portraits, etc. Then I can apply those with one click and make minor adjustments from there, which saves tons of time.
        </p>
        
        <p class="forum-reply">
          <span class="author">PS_Master:</span>
          If you're taking your photos to Photoshop, keep it simple there too. I usually do:
          1. Spot healing for any dust or blemishes
          2. Light dodge and burn for emphasis
          3. Maybe a curves adjustment for fine-tuning contrast
          4. Sharpening as a final step (high pass filter is great)
          
          Don't overcomplicate things - less is often more in editing!
        </p>
      `,
      likes: 19,
      comments: 6
    }
  ];
  
  // Filter content based on active filter and search query
  const filteredContent = allContent.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  // Sort content by date (newest first)
  const sortedContent = [...filteredContent].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  // Toggle article expansion
  const toggleArticle = (id) => {
    if (expandedArticle === id) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(id);
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Renetium Knowledge Base</h1>
          <p className="text-xl text-blue-200">Articles, tips & tricks, and community discussions - all in one place</p>
        </div>
      </header>
      
      {/* Search and Filter Section */}
      <section className="bg-blue-800 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for articles, tips, or discussions..."
                className="w-full px-4 py-3 pl-10 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={20} className="absolute text-gray-500 left-3 top-3.5" />
            </div>
            
            {/* Filters */}
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeFilter === 'all' ? 'bg-white text-blue-800' : 'bg-blue-700 text-white hover:bg-blue-600'}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center ${activeFilter === 'article' ? 'bg-white text-blue-800' : 'bg-blue-700 text-white hover:bg-blue-600'}`}
                onClick={() => setActiveFilter('article')}
              >
                <BookOpen size={16} className="mr-1" /> Articles
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center ${activeFilter === 'tip' ? 'bg-white text-blue-800' : 'bg-blue-700 text-white hover:bg-blue-600'}`}
                onClick={() => setActiveFilter('tip')}
              >
                <Share2 size={16} className="mr-1" /> Tips & Tricks
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center ${activeFilter === 'forum' ? 'bg-white text-blue-800' : 'bg-blue-700 text-white hover:bg-blue-600'}`}
                onClick={() => setActiveFilter('forum')}
              >
                <MessageCircle size={16} className="mr-1" /> Forum
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          {sortedContent.length > 0 ? (
            <div className="space-y-6">
              {sortedContent.map((item) => (
                <ContentItem
                  key={item.id}
                  item={item}
                  isExpanded={expandedArticle === item.id}
                  onToggle={toggleArticle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No content matches your current filters.</p>
              <button 
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 bg-blue-100">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Join Our Newsletter</h2>
          <p className="text-blue-700 mb-6">Get the latest articles, tips, and community discussions delivered to your inbox</p>
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
    </div>
  );
};

export default ArticlesPage;
