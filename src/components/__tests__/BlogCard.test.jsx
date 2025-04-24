import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogCard from '../BlogCard';

const mockBlog = {
  title: 'Test Blog Post',
  image: 'https://example.com/image.jpg',
  excerpt: 'This is a test blog post excerpt.',
  readTime: '5 min read',
  slug: 'test-blog-post'
};

describe('BlogCard', () => {
  it('renders blog card with correct content', () => {
    render(
      <MemoryRouter>
        <BlogCard {...mockBlog} />
      </MemoryRouter>
    );

    // Check if title is rendered
    expect(screen.getByText(mockBlog.title)).toBeInTheDocument();
    
    // Check if excerpt is rendered
    expect(screen.getByText(mockBlog.excerpt)).toBeInTheDocument();
    
    // Check if read time is rendered
    expect(screen.getByText(mockBlog.readTime)).toBeInTheDocument();
    
    // Check if image is rendered with correct alt text
    const image = screen.getByAltText(mockBlog.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockBlog.image);
    
    // Check if link is correct
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/blog/${mockBlog.slug}`);
  });

  it('applies correct hover styles', () => {
    render(
      <MemoryRouter>
        <BlogCard {...mockBlog} />
      </MemoryRouter>
    );

    const card = screen.getByRole('article');
    expect(card).toHaveClass('hover:shadow-lg');
  });
}); 