import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelWidget from '../HotelWidget';

describe('HotelWidget', () => {
  const defaultProps = {
    location: 'New York',
    checkIn: '2024-03-15',
    checkOut: '2024-03-22',
    guests: 2,
    rooms: 1
  };

  it('renders the iframe with correct src URL', () => {
    render(<HotelWidget {...defaultProps} />);
    
    const iframe = screen.getByTitle('Hotel Search');
    expect(iframe).toBeInTheDocument();
    
    const expectedUrl = `https://tp.media/content?currency=usd&trs=294439&search_url=hotels.trip.com/hotels/list?city=1032&checkin=${defaultProps.checkIn}&checkout=${defaultProps.checkOut}&guests=${defaultProps.guests}&rooms=${defaultProps.rooms}&marker=624965`;
    expect(iframe).toHaveAttribute('src', expectedUrl);
  });

  it('renders with custom currency when provided', () => {
    render(<HotelWidget {...defaultProps} currency="EUR" />);
    
    const iframe = screen.getByTitle('Hotel Search');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('currency=EUR'));
  });

  it('renders with custom height when provided', () => {
    render(<HotelWidget {...defaultProps} height="600px" />);
    
    const iframe = screen.getByTitle('Hotel Search');
    expect(iframe).toHaveAttribute('height', '600px');
  });

  it('renders with custom width when provided', () => {
    render(<HotelWidget {...defaultProps} width="100%" />);
    
    const iframe = screen.getByTitle('Hotel Search');
    expect(iframe).toHaveAttribute('width', '100%');
  });

  it('renders with default height and width when not provided', () => {
    render(<HotelWidget {...defaultProps} />);
    
    const iframe = screen.getByTitle('Hotel Search');
    expect(iframe).toHaveAttribute('height', '500px');
    expect(iframe).toHaveAttribute('width', '100%');
  });
}); 