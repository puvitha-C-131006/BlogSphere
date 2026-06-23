import React, { useState, useEffect } from 'react';
import BlogCard from '../components/blog/BlogCard';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FiBookOpen, FiSearch, FiLoader } from 'react-icons/fi';
import useSearchStore from '../store/useSearchStore';
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const BlogListing = () => {
  const { searchTerm } = useSearchStore();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Stories');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ['All Stories', 'Technology', 'Design', 'Productivity', 'Mindfulness', 'Lifestyle'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = (post.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                          (post.subtitle?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (post.content?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Stories' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
      
      {/* Filtered By Bar (Only show if not All Stories) */}
      {selectedCategory !== 'All Stories' && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center text-sm">
            <span className="text-gray-500 mr-2">Filtered by:</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">Category: {selectedCategory}</span>
              <button 
                onClick={() => setSelectedCategory('All Stories')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Explore Topics Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-1">
          <FiBookOpen className="w-6 h-6 text-gray-800 dark:text-gray-200" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Explore Topics</h2>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Filter articles by your favorite categories</p>
        
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedCategory === category 
                  ? 'bg-[#0f172a] text-white border-[#0f172a] dark:bg-white dark:text-gray-900 dark:border-white' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">Search Results</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500">Showing {filteredPosts.length} articles matching filters</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <FiLoader className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2rem] mt-8 shadow-sm">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <FiSearch className="w-6 h-6 text-gray-400" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
          <p className="text-center text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
            We couldn't find any published stories matching your filters.<br/>Try selecting a different topic or resetting your search.
          </p>
          <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800" onClick={() => setSelectedCategory('All Stories')}>
            Reset filters
          </Button>
        </div>
      )}

      {filteredPosts.length > 0 && (
        <div className="mt-16 flex justify-center">
          <Button variant="outline" className="rounded-full px-8">Load More Articles</Button>
        </div>
      )}
      </div>
    </div>
  );
};

export default BlogListing;
