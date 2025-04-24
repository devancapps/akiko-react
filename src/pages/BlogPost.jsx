import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { marked } from 'marked';
import SEO from '../components/SEO';
import SubscribeForm from '../components/SubscribeForm';
import { linkify } from '../utils/linkify';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

const BlogPost = () => {
  const { slug } = useParams();
  const { getBlogBySlug, loading, error } = useBlog();
  const blog = getBlogBySlug(slug);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">
          Error loading blog post: {error.message}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-4">The requested blog post could not be found.</p>
          <Link
            to="/blog"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const content = linkify(marked(blog.content));

  return (
    <ErrorBoundary>
      <SEO
        title={`${blog.title} | Akiko Adventures`}
        description={blog.excerpt}
        image={blog.image}
        type="article"
      />
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              to="/blog"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center text-gray-600">
              <span>{blog.readTime} min read</span>
            </div>
          </header>

          {blog.image && (
            <div className="mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-12">
            <SubscribeForm />
          </div>
        </article>
      </div>
    </ErrorBoundary>
  );
};

export default BlogPost; 