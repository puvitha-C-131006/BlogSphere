import React, { useState, useEffect } from 'react';
import { FiBookmark, FiLoader } from 'react-icons/fi';
import Button from '../components/common/Button';
import useAuthStore from '../store/useAuthStore';
import { db } from '../config/firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import BlogCard from '../components/blog/BlogCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('My Feed');
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const tabs = ['My Feed', 'Following (0)', 'Bookmarks (0)'];

  useEffect(() => {
    if (!user) return;
    
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filteredPosts = posts.filter(post => post.author?.name === user.name);
      setUserPosts(filteredPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      try {
        await deleteDoc(doc(db, 'posts', id));
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Failed to delete story.");
      }
    }
  };

  const stats = {
    followers: 0,
    following: 0,
    published: userPosts.filter(p => p.status !== 'draft').length,
    drafts: userPosts.filter(p => p.status === 'draft').length,
    bookmarks: 0
  };

  return (
    <div className="max-w-6xl mx-auto w-full pt-8 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column - Feed/Tabs */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800 mb-8 flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.split(' ')[0])}
                className={`pb-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.split(' ')[0]
                    ? 'text-secondary dark:text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                {tab}
                {activeTab === tab.split(' ')[0] && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary dark:bg-white rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'My' && (
            loading ? (
              <div className="flex justify-center py-12"><FiLoader className="animate-spin w-8 h-8 text-primary" /></div>
            ) : userPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userPosts.map(post => (
                  <BlogCard key={post.id} post={post} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50/50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">No stories yet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                  Start writing your first story to see it here.
                </p>
                <Button to="/create" variant="outline" className="rounded-full px-6">
                  Write a Story
                </Button>
              </div>
            )
          )}
          
          {activeTab === 'Bookmarks' && (
            <div className="bg-gray-50/50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center mb-6 text-gray-400">
                <FiBookmark className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">No bookmarked stories</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                Click the bookmark icon on any blog card to save it for reading later.
              </p>
              <Button variant="outline" className="rounded-full px-6">
                Find Stories to Save
              </Button>
            </div>
          )}
        </div>

        {/* Right Column - Profile Sidebar */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="h-24 bg-gray-100 dark:bg-gray-800"></div>
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shadow-md">
                  {user?.avatar && !user.avatar.includes('dicebear') ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-gray-400">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
              </div>
              <div className="pt-16 text-center">
                <h2 className="text-xl font-bold text-secondary dark:text-white">{user?.name || 'User Name'}</h2>
                <p className="text-sm text-gray-500 mb-4">@{user?.username || 'username'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                  A reader and writer on BlogSphere publishing platform.
                </p>
                
                <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-800 border-t border-gray-100 dark:border-gray-800 pt-6">
                  <div>
                    <p className="text-xl font-bold text-secondary dark:text-white">{stats.followers}</p>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Followers</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-secondary dark:text-white">{stats.following}</p>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Overview Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-secondary dark:text-white flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs">🧭</span>
              Activity Overview
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span>Published Stories:</span>
                <span className="font-bold text-secondary dark:text-white">{stats.published}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span>Draft Stories:</span>
                <span className="font-bold text-secondary dark:text-white">{stats.drafts}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <span>Total Bookmarks:</span>
                <span className="font-bold text-secondary dark:text-white">{stats.bookmarks}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
