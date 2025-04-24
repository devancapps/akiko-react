import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubscribeForm from '../SubscribeForm';

describe('SubscribeForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the form with all required fields', () => {
    render(<SubscribeForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('validates email field', () => {
    render(<SubscribeForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates required fields', () => {
    render(<SubscribeForm onSubmit={mockOnSubmit} />);

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', () => {
    render(<SubscribeForm onSubmit={mockOnSubmit} />);

    const formData = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe'
    };

    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: formData.email } });
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: formData.firstName } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: formData.lastName } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockOnSubmit).toHaveBeenCalledWith(formData);
  });

  it('shows success message after successful submission', () => {
    render(<SubscribeForm onSubmit={mockOnSubmit} />);

    const formData = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe'
    };

    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: formData.email } });
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: formData.firstName } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: formData.lastName } });
    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText('Thank you for subscribing!')).toBeInTheDocument();
  });
}); 