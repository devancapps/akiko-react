import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../SEO';

describe('SEO', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    image: 'https://example.com/test.jpg',
    canonical: 'https://example.com/test'
  };

  const renderWithHelmet = (props) => {
    return render(
      <HelmetProvider>
        <SEO {...props} />
      </HelmetProvider>
    );
  };

  it('renders title tag', () => {
    renderWithHelmet(defaultProps);
    const helmet = document.querySelector('title');
    expect(helmet).toHaveTextContent(defaultProps.title);
  });

  it('renders meta description', () => {
    renderWithHelmet(defaultProps);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute('content', defaultProps.description);
  });

  it('renders Open Graph tags', () => {
    renderWithHelmet(defaultProps);
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    expect(ogTitle).toHaveAttribute('content', defaultProps.title);
    expect(ogDescription).toHaveAttribute('content', defaultProps.description);
    expect(ogImage).toHaveAttribute('content', defaultProps.image);
    expect(ogUrl).toHaveAttribute('content', defaultProps.canonical);
  });

  it('renders Twitter Card tags', () => {
    renderWithHelmet(defaultProps);
    
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');

    expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    expect(twitterTitle).toHaveAttribute('content', defaultProps.title);
    expect(twitterDescription).toHaveAttribute('content', defaultProps.description);
    expect(twitterImage).toHaveAttribute('content', defaultProps.image);
  });

  it('renders canonical link', () => {
    renderWithHelmet(defaultProps);
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toHaveAttribute('href', defaultProps.canonical);
  });

  it('uses default values when props are not provided', () => {
    renderWithHelmet({});
    
    const helmet = document.querySelector('title');
    expect(helmet).toHaveTextContent('Akiko Adventures');

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute('content', 'Travel blog and resources for adventure seekers');

    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage).toHaveAttribute('content', 'https://example.com/default.jpg');
  });
}); 