import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FlightWidget from '../FlightWidget';

describe('FlightWidget', () => {
  const defaultProps = {
    origin: 'NYC',
    destination: 'LON',
    date: '2024-03-15',
    returnDate: '2024-03-22',
    passengers: 2,
    class: 'economy'
  };

  it('renders with default props', () => {
    render(<FlightWidget {...defaultProps} />);
    
    // Check if all form fields are rendered with correct values
    expect(screen.getByLabelText('From')).toHaveValue(defaultProps.origin);
    expect(screen.getByLabelText('To')).toHaveValue(defaultProps.destination);
    expect(screen.getByLabelText('Departure Date')).toHaveValue(defaultProps.date);
    expect(screen.getByLabelText('Return Date')).toHaveValue(defaultProps.returnDate);
    expect(screen.getByLabelText('Passengers')).toHaveValue(defaultProps.passengers.toString());
    expect(screen.getByLabelText('Class')).toHaveValue(defaultProps.class);
  });

  it('updates form values when inputs change', () => {
    render(<FlightWidget {...defaultProps} />);
    
    // Change origin
    fireEvent.change(screen.getByLabelText('From'), { target: { value: 'LAX' } });
    expect(screen.getByLabelText('From')).toHaveValue('LAX');

    // Change destination
    fireEvent.change(screen.getByLabelText('To'), { target: { value: 'PAR' } });
    expect(screen.getByLabelText('To')).toHaveValue('PAR');

    // Change dates
    fireEvent.change(screen.getByLabelText('Departure Date'), { target: { value: '2024-04-01' } });
    expect(screen.getByLabelText('Departure Date')).toHaveValue('2024-04-01');

    // Change passengers
    fireEvent.change(screen.getByLabelText('Passengers'), { target: { value: '3' } });
    expect(screen.getByLabelText('Passengers')).toHaveValue('3');

    // Change class
    fireEvent.change(screen.getByLabelText('Class'), { target: { value: 'business' } });
    expect(screen.getByLabelText('Class')).toHaveValue('business');
  });

  it('generates correct search URL on form submission', () => {
    render(<FlightWidget {...defaultProps} />);
    
    const form = screen.getByRole('form');
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);

    // Check if the search URL is generated correctly
    const searchUrl = `https://www.trip.com/flights/${defaultProps.origin.toLowerCase()}-${defaultProps.destination.toLowerCase()}/tickets-${defaultProps.origin.toLowerCase()}-${defaultProps.destination.toLowerCase()}/?tripType=0&dcity=${defaultProps.origin}&acity=${defaultProps.destination}&ddate=${defaultProps.date}&rdate=${defaultProps.returnDate}&adult=${defaultProps.passengers}&cabin=${defaultProps.class}&marker=624965`;
    
    expect(window.open).toHaveBeenCalledWith(searchUrl, '_blank');
  });

  it('validates form inputs', () => {
    render(<FlightWidget {...defaultProps} />);
    
    // Test empty origin
    fireEvent.change(screen.getByLabelText('From'), { target: { value: '' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText('Please enter origin city')).toBeInTheDocument();

    // Test empty destination
    fireEvent.change(screen.getByLabelText('To'), { target: { value: '' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText('Please enter destination city')).toBeInTheDocument();

    // Test invalid date
    fireEvent.change(screen.getByLabelText('Departure Date'), { target: { value: '2023-01-01' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByText('Please select a future date')).toBeInTheDocument();
  });
}); 