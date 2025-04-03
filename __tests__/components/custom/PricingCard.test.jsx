import React from 'react';
import { render, screen } from '@testing-library/react';
import { PricingCards } from '@/components/custom/PricingCard';

// Mock the dependencies
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className, variant }) => (
    <button 
      data-testid="mock-button" 
      className={className} 
      data-variant={variant}
    >
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }) => (
    <div data-testid="mock-card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }) => (
    <div data-testid="mock-card-content" className={className}>
      {children}
    </div>
  ),
  CardDescription: ({ children, className }) => (
    <div data-testid="mock-card-description" className={className}>
      {children}
    </div>
  ),
  CardFooter: ({ children, className }) => (
    <div data-testid="mock-card-footer" className={className}>
      {children}
    </div>
  ),
  CardHeader: ({ children }) => (
    <div data-testid="mock-card-header">
      {children}
    </div>
  ),
  CardTitle: ({ children, className }) => (
    <div data-testid="mock-card-title" className={className}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children, className }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

jest.mock('lucide-react', () => ({
  Check: () => <div data-testid="mock-check-icon">✓</div>,
}));

describe('PricingCards Component', () => {
  test('renders pricing card with correct plan details', () => {
    render(<PricingCards />);
    
    // Check if the card is rendered
    const card = screen.getByTestId('mock-card');
    expect(card).toBeInTheDocument();
    
    // Check if the plan name is rendered
    const planName = screen.getByText('Basic');
    expect(planName).toBeInTheDocument();
    
    // Check if the plan description is rendered
    const planDescription = screen.getByText('Essential features for small businesses');
    expect(planDescription).toBeInTheDocument();
    
    // Check if the plan price is rendered
    const planPrice = screen.getByText('$9');
    expect(planPrice).toBeInTheDocument();
    
    // Check if the plan features are rendered
    const includedFeatures = screen.getAllByTestId('mock-check-icon');
    expect(includedFeatures.length).toBe(4); // There should be 4 included features
    
    // Check if the button is rendered with the correct text
    const button = screen.getByTestId('mock-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Get Started');
  });

  test('renders features with correct styling based on inclusion', () => {
    render(<PricingCards />);
    
    // Get all list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(6); // There should be 6 features total
    
    // Check if included features have the check icon
    const includedFeatures = screen.getAllByTestId('mock-check-icon');
    expect(includedFeatures.length).toBe(4); // There should be 4 included features
    
    // Check if the feature texts are rendered
    expect(screen.getByText('Up to 5 users')).toBeInTheDocument();
    expect(screen.getByText('Basic analytics')).toBeInTheDocument();
    expect(screen.getByText('24-hour support')).toBeInTheDocument();
    expect(screen.getByText('1GB storage')).toBeInTheDocument();
    expect(screen.getByText('API access')).toBeInTheDocument();
    expect(screen.getByText('Custom branding')).toBeInTheDocument();
  });
});
