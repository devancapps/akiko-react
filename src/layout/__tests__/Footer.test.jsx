import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/akiko', icon: 'twitter' },
    { name: 'Instagram', url: 'https://instagram.com/akiko', icon: 'instagram' },
    { name: 'Facebook', url: 'https://facebook.com/akiko', icon: 'facebook' }
  ];

  const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Resources', url: '/resources' }
  ];

  it('renders social media links', () => {
    render(<Footer socialLinks={socialLinks} navLinks={navLinks} />);

    socialLinks.forEach(link => {
      const socialLink = screen.getByRole('link', { name: link.name });
      expect(socialLink).toBeInTheDocument();
      expect(socialLink).toHaveAttribute('href', link.url);
      expect(socialLink).toHaveAttribute('target', '_blank');
      expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders navigation links', () => {
    render(<Footer socialLinks={socialLinks} navLinks={navLinks} />);

    navLinks.forEach(link => {
      const navLink = screen.getByRole('link', { name: link.name });
      expect(navLink).toBeInTheDocument();
      expect(navLink).toHaveAttribute('href', link.url);
    });
  });

  it('renders copyright text', () => {
    render(<Footer socialLinks={socialLinks} navLinks={navLinks} />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Akiko Adventures`)).toBeInTheDocument();
  });

  it('renders disclosure text', () => {
    render(<Footer socialLinks={socialLinks} navLinks={navLinks} />);

    expect(screen.getByText(/This site contains affiliate links/i)).toBeInTheDocument();
    expect(screen.getByText(/We may earn a commission/i)).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    render(<Footer socialLinks={socialLinks} navLinks={navLinks} />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gray-900');
    expect(footer).toHaveClass('text-white');
    expect(footer).toHaveClass('py-12');
  });
}); 