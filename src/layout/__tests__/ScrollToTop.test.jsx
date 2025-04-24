import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  it('renders the scroll button', () => {
    render(<ScrollToTop />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('scrolls to top when clicked', () => {
    render(<ScrollToTop />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('shows button when scrolled down', () => {
    render(<ScrollToTop />);
    
    // Mock scroll position
    Object.defineProperty(window, 'pageYOffset', { value: 1000, writable: true });
    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-100');
  });

  it('hides button when at top', () => {
    render(<ScrollToTop />);
    
    // Mock scroll position
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
    fireEvent.scroll(window);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-0');
  });

  it('applies correct styles', () => {
    render(<ScrollToTop />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('fixed');
    expect(button).toHaveClass('bottom-8');
    expect(button).toHaveClass('right-8');
    expect(button).toHaveClass('bg-blue-500');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('p-3');
    expect(button).toHaveClass('shadow-lg');
  });
}); 