import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();
const POSTS_PER_PAGE = 9;

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBlogs = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Check localStorage first
      const cachedBlogs = localStorage.getItem('akiko_blogs');
      const cachedTimestamp = localStorage.getItem('akiko_blogs_timestamp');
      
      if (cachedBlogs && cachedTimestamp && !isRefresh) {
        const timestamp = parseInt(cachedTimestamp);
        const now = Date.now();
        // Cache valid for 1 hour
        if (now - timestamp < 3600000) {
          const parsedBlogs = JSON.parse(cachedBlogs);
          setBlogs(parsedBlogs);
          setHasMore(parsedBlogs.length > POSTS_PER_PAGE);
          return;
        }
      }

      // Fetch fresh data
      const response = await fetch('/data/blogs.json');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      
      const data = await response.json();
      setBlogs(data);
      setHasMore(data.length > POSTS_PER_PAGE);
      
      // Update cache
      localStorage.setItem('akiko_blogs', JSON.stringify(data));
      localStorage.setItem('akiko_blogs_timestamp', Date.now().toString());
      setRetryCount(0);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
      
      // Retry logic
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchBlogs(isRefresh);
        }, 1000 * Math.pow(2, retryCount)); // Exponential backoff
      }
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const getBlogBySlug = (slug) => {
    return blogs.find(blog => blog.slug === slug);
  };

  const refreshBlogs = async () => {
    setCurrentPage(1);
    await fetchBlogs(true);
  };

  const loadMore = () => {
    if (!hasMore || loading) return;
    setCurrentPage(prev => prev + 1);
  };

  const getPaginatedBlogs = () => {
    return blogs.slice(0, currentPage * POSTS_PER_PAGE);
  };

  return (
    <BlogContext.Provider value={{
      blogs: getPaginatedBlogs(),
      loading,
      refreshing,
      error,
      retryCount,
      hasMore,
      getBlogBySlug,
      refreshBlogs,
      loadMore
    }}>
      {children}
    </BlogContext.Provider>
  );
}; 