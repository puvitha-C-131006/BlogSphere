import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { FiEye, FiEdit3, FiFileText, FiBarChart2 } from 'react-icons/fi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { db } from '../config/firebase';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';

const CreatePost = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('Write');
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Only allow the author to edit
          if (data.author.name !== user?.name && user) {
            alert("You do not have permission to edit this post.");
            navigate('/dashboard');
            return;
          }
          setTitle(data.title || '');
          setSubtitle(data.subtitle || '');
          setContent(data.content || '');
          setCategory(data.category || 'Technology');
          setTags(data.tags ? data.tags.join(', ') : '');
          setCoverUrl(data.coverImage || '');
        }
      };
      fetchPost();
    }
  }, [id, user, navigate]);

  const handleSubmit = async (e, isDraft = false) => {
    e?.preventDefault();
    
    if (!title) {
      alert("Please enter a title for your story.");
      return;
    }
    if (!content) {
      alert("Please write some content for your story.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const postData = {
        title,
        subtitle,
        content,
        category,
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        coverImage: coverUrl,
        status: isDraft ? 'draft' : 'published',
        author: {
          name: user?.name || 'Anonymous',
          avatar: user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=fallback`
        },
        updatedAt: serverTimestamp()
      };

      if (id) {
        const docRef = doc(db, 'posts', id);
        await updateDoc(docRef, postData);
        alert("Story updated successfully!");
      } else {
        postData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'posts'), postData);
        alert(isDraft ? "Story saved as draft successfully!" : "Story published successfully!");
      }
      navigate('/dashboard');
    } catch (error) {
      console.error("Error adding/updating document: ", error);
      alert("Failed to save story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navTabs = [
    { id: 'Write', icon: <FiEdit3 className="w-4 h-4" /> },
    { id: 'Stories (0)', icon: <FiFileText className="w-4 h-4" /> },
    { id: 'Analytics', icon: <FiBarChart2 className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full bg-[#f8f9fa] dark:bg-gray-900 min-h-screen pb-20">
      
      {/* Header Area */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold text-secondary dark:text-white mb-1">Creator Studio</h1>
          <p className="text-gray-500 text-sm mb-6">Welcome, {user?.name}. Draft, schedule, publish, and monitor your stories.</p>
          
          <div className="flex gap-2">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium transition-colors border border-b-0 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-900 text-secondary dark:text-white border-gray-200 dark:border-gray-700 relative top-[1px]'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-transparent'
                }`}
              >
                {tab.icon}
                {tab.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                <h2 className="font-bold text-secondary dark:text-white">Write a New Story</h2>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-secondary dark:hover:text-white transition-colors">
                  <FiEye className="w-3.5 h-3.5" />
                  Show Preview
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input 
                    label="Title" 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a captivating title..." 
                  />

                  <Input 
                    label="Subtitle" 
                    id="subtitle" 
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Explain the article preview..." 
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="category" className="text-xs font-semibold text-gray-700 dark:text-gray-300">Category</label>
                      <select 
                        id="category" 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Design">Design</option>
                        <option value="Development">Development</option>
                        <option value="Productivity">Productivity</option>
                      </select>
                    </div>
                    
                    <Input 
                      label="Tags (comma-separated)" 
                      id="tags" 
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="React, clean-code, design" 
                    />
                  </div>

                  <Input 
                    label="Cover Image URL" 
                    id="coverUrl" 
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..." 
                  />

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Upload Image</label>
                    <div className="flex">
                      <input type="file" className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg w-full bg-white dark:bg-gray-800" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="schedule" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor="schedule" className="text-sm text-gray-700 dark:text-gray-300">Schedule this story for later publication</label>
                  </div>

                  <div className="flex flex-col space-y-1.5 pt-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Content (HTML supported)</label>
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-300 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px]">
                      <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="<h2>Intro</h2><p>Start writing your story here...</p>"
                        className="w-full min-h-[300px] p-4 bg-transparent outline-none text-gray-900 dark:text-white resize-y"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" onClick={(e) => handleSubmit(e, true)} disabled={isSubmitting} variant="outline" className="flex-1 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5">
                      {isSubmitting ? 'Saving...' : 'Save Draft'}
                    </Button>
                    <Button type="submit" onClick={(e) => handleSubmit(e, false)} disabled={isSubmitting} className="flex-1 rounded-full bg-[#0f172a] hover:bg-black text-white py-2.5">
                      {isSubmitting ? 'Publishing...' : 'Publish Story'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-3">
                <h3 className="text-sm font-bold text-secondary dark:text-white">Live Story Preview</h3>
              </div>
              <div className="p-5">
                {coverUrl ? (
                  <img src={coverUrl} alt="Cover Preview" className="w-full h-48 object-cover rounded-lg mb-4 bg-gray-100" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                    No Cover Image
                  </div>
                )}
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    {category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Previewing</span>
                </div>
                
                <h2 className="text-xl font-bold text-secondary dark:text-white mb-2 leading-tight">
                  {title || 'Untitled Story'}
                </h2>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 italic">
                  {subtitle || 'Write a subtitle...'}
                </p>

                <p className="text-xs text-gray-400 italic border-t border-gray-100 dark:border-gray-700 pt-4">
                  Write some content in the editor to preview your story structure.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePost;
