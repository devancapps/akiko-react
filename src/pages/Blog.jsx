import React, { useCallback, useEffect, useRef } from 'react';
import { useBlog } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

const Blog = () => {
  const { blogs, loading, refreshing, error, hasMore, refreshBlogs, loadMore } = useBlog();
  const observer = useRef();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const lastBlogElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    if (loading) return;
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      if (hasMore) loadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, loadMore]);

  if (loading && blogs.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">
          Error loading blog posts: {error.message}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SEO
        title="Travel Blog | Akiko Adventures"
        description="Explore our travel guides, tips, and stories from around the world."
        type="website"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Travel Blog</h1>
          {isAdmin && (
            <button
              onClick={refreshBlogs}
              disabled={refreshing}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {refreshing ? 'Refreshing...' : 'Refresh Blog Data'}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={blog.slug}
              ref={index === blogs.length - 1 ? lastBlogElementRef : null}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
        {loading && blogs.length > 0 && (
          <div className="flex justify-center mt-8">
            <LoadingSpinner />
          </div>
        )}
        {!hasMore && blogs.length > 0 && (
          <div className="text-center mt-8 text-gray-500">
            No more blog posts to load
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Blog; 