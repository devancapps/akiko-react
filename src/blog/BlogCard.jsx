import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ title, image, excerpt, readTime, slug }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blog/${slug}`}>
        <div className="image-container image-md">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600">
            {title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default BlogCard; 