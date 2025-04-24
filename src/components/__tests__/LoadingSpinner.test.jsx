import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the spinner with correct classes', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('h-8');
    expect(spinner).toHaveClass('w-8');
    expect(spinner).toHaveClass('text-blue-500');
  });

  it('renders with custom size when size prop is provided', () => {
    render(<LoadingSpinner size="lg" />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-12');
    expect(spinner).toHaveClass('w-12');
  });

  it('renders with custom color when color prop is provided', () => {
    render(<LoadingSpinner color="red" />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('text-red-500');
  });

  it('renders with custom className when provided', () => {
    render(<LoadingSpinner className="custom-class" />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-class');
  });
}); 