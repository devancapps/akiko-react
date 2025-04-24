import React from 'react';
import { render, screen } from '@testing-library/react';
import DestinationGrid from '../DestinationGrid';

describe('DestinationGrid', () => {
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
    },
    {
      name: 'New York',
      image: 'https://example.com/ny.jpg',
      link: 'https://trip.com/ny?marker=624965'
    }
  ];

  it('renders all destination cards', () => {
    render(<DestinationGrid destinations={destinations} />);

    destinations.forEach(dest => {
      expect(screen.getByText(dest.name)).toBeInTheDocument();
    });
  });

  it('renders images with correct src and alt attributes', () => {
    render(<DestinationGrid destinations={destinations} />);

    destinations.forEach(dest => {
      const image = screen.getByAltText(dest.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', dest.image);
    });
  });

  it('renders links with correct href and attributes', () => {
    render(<DestinationGrid destinations={destinations} />);

    destinations.forEach(dest => {
      const link = screen.getByText(dest.name).closest('a');
      expect(link).toHaveAttribute('href', dest.link);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('applies correct grid layout classes', () => {
    render(<DestinationGrid destinations={destinations} />);

    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('applies correct hover styles to cards', () => {
    render(<DestinationGrid destinations={destinations} />);

    const cards = screen.getAllByRole('article');
    cards.forEach(card => {
      expect(card).toHaveClass('hover:scale-105');
      expect(card).toHaveClass('hover:shadow-lg');
    });
  });
}); 