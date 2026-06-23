import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentCard from '../components/blog/CommentCard';
import Button from '../components/common/Button';
import { db } from '../config/firebase';
import { doc, getDoc, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import useAuthStore from '../store/useAuthStore';
import { FiLoader } from 'react-icons/fi';

const SingleBlog = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const q = query(collection(db, `posts/${id}/comments`), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsData);
    });
    return () => unsubscribe();
  }, [id]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, `posts/${id}/comments`), {
        content: newComment,
        author: {
          name: user.name,
          avatar: user.avatar,
        },
        createdAt: serverTimestamp()
      });
      setNewComment('');
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 min-h-screen">
        <FiLoader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20 min-h-screen">
        <h2 className="text-2xl font-bold">Post not found</h2>
      </div>
    );
  }

  return (
    <article className="pb-20">
      <div className="relative h-[60vh] min-h-[400px] w-full bg-secondary">
        <img 
          src={post.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop"} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
            <span className="px-3 py-1 bg-primary text-white text-xs md:text-sm font-semibold rounded-full shadow-sm mb-4 md:mb-6 inline-block">
              {post.category || 'Technology'}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/80 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <img 
                  src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.name || 'Anonymous'}&background=random`} 
                  alt={post.author?.name || 'Anonymous'} 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 bg-white"
                />
                <span className="text-white">{post.author?.name || 'Anonymous'}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 hidden sm:block"></span>
              <span className="hidden sm:block">{post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 hidden sm:block"></span>
              <span className="hidden sm:block">{post.readTime || '5 min read'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12 lg:p-16 border border-gray-100">
          <div 
            className="prose prose-lg prose-blue max-w-none text-gray-600 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-secondary [&_h2]:mb-4 [&_h2]:mt-8 [&_p]:mb-6 [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-semibold text-secondary">Tags:</span>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="px-4 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-100 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h3 className="text-2xl font-bold text-secondary mb-8">Comments ({comments.length})</h3>
        
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <h4 className="font-semibold text-lg mb-4 text-secondary">Leave a comment</h4>
          <form onSubmit={handlePostComment} className="space-y-4">
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
              rows="4"
              placeholder={user ? "What are your thoughts?" : "Please sign in to leave a comment."}
              disabled={!user}
            ></textarea>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !user || !newComment.trim()}>
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default SingleBlog;
