import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DestinationCarousel from '../DestinationCarousel';

describe('DestinationCarousel', () => {
  const destinations = [
    {
      name: 'Tokyo',
      image: 'https://example.com/tokyo.jpg',
      link: 'https://trip.com/tokyo?marker=624965'
    },
    {
      name: 'Paris',
      image: 'https://example.com/paris.jpg',
      link: 'https://trip.com/paris?marker=624965'
    }
  ];

  it('renders destination cards with correct content', () => {
    render(<DestinationCarousel destinations={destinations} />);

    // Check if all destination names are rendered
    destinations.forEach(dest => {
      expect(screen.getByText(dest.name)).toBeInTheDocument();
    });

    // Check if all images are rendered with correct alt text
    destinations.forEach(dest => {
      const image = screen.getByAltText(dest.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', dest.image);
    });

    // Check if all links are correct
    destinations.forEach(dest => {
      const link = screen.getByText(dest.name).closest('a');
      expect(link).toHaveAttribute('href', dest.link);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('scrolls left and right when buttons are clicked', () => {
    render(<DestinationCarousel destinations={destinations} />);
    
    const scrollLeft = jest.fn();
    const scrollRight = jest.fn();
    
    const carousel = screen.getByRole('region');
    carousel.scrollLeft = scrollLeft;
    carousel.scrollRight = scrollRight;

    // Click left scroll button
    fireEvent.click(screen.getByLabelText('Scroll left'));
    expect(scrollLeft).toHaveBeenCalled();

    // Click right scroll button
    fireEvent.click(screen.getByLabelText('Scroll right'));
    expect(scrollRight).toHaveBeenCalled();
  });

  it('applies correct hover styles', () => {
    render(<DestinationCarousel destinations={destinations} />);
    
    const cards = screen.getAllByRole('article');
    cards.forEach(card => {
      expect(card).toHaveClass('hover:scale-105');
      expect(card).toHaveClass('hover:shadow-lg');
    });
  });
}); 