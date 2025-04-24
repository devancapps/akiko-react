import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Resources', url: '/resources' }
  ];

  it('renders logo and navigation links', () => {
    render(<Navbar navLinks={navLinks} />);

    // Check logo
    const logo = screen.getByAltText('Akiko Adventures');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.svg');

    // Check navigation links
    navLinks.forEach(link => {
      const navLink = screen.getByRole('link', { name: link.name });
      expect(navLink).toBeInTheDocument();
      expect(navLink).toHaveAttribute('href', link.url);
    });
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Navbar navLinks={navLinks} />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    // Check if mobile menu is visible
    const mobileMenu = screen.getByRole('navigation');
    expect(mobileMenu).toHaveClass('block');

    // Click again to close
    fireEvent.click(menuButton);
    expect(mobileMenu).toHaveClass('hidden');
  });

  it('applies correct styles', () => {
    render(<Navbar navLinks={navLinks} />);

    const navbar = screen.getByRole('banner');
    expect(navbar).toHaveClass('fixed');
    expect(navbar).toHaveClass('top-0');
    expect(navbar).toHaveClass('w-full');
    expect(navbar).toHaveClass('bg-gradient-to-r');
    expect(navbar).toHaveClass('from-blue-600');
    expect(navbar).toHaveClass('to-purple-600');
    expect(navbar).toHaveClass('text-white');
  });

  it('applies active styles to current route', () => {
    // Mock useLocation hook
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: () => ({
        pathname: '/blog'
      })
    }));

    render(<Navbar navLinks={navLinks} />);

    const activeLink = screen.getByRole('link', { name: 'Blog' });
    expect(activeLink).toHaveClass('font-bold');
    expect(activeLink).toHaveClass('border-b-2');
    expect(activeLink).toHaveClass('border-white');
  });

  it('handles scroll events correctly', () => {
    render(<Navbar navLinks={navLinks} />);

    // Mock scroll position
    Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });
    fireEvent.scroll(window);

    const navbar = screen.getByRole('banner');
    expect(navbar).toHaveClass('shadow-lg');

    // Scroll back to top
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
    fireEvent.scroll(window);

    expect(navbar).not.toHaveClass('shadow-lg');
  });
}); 