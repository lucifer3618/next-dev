import React from 'react';
import { render, screen } from '@testing-library/react';
import FeatureCard from '@/components/custom/FeatureCard';

// Mock the framer-motion module
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe('FeatureCard Component', () => {
  const mockProps = {
    icon: <svg data-testid="mock-icon" />,
    title: 'Test Feature',
    description: 'This is a test feature description',
    delay: 0.2,
    className: 'custom-class'
  };

  test('renders with correct props', () => {
    render(<FeatureCard {...mockProps} />);
    
    // Check if title is rendered
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument();
    
    // Check if icon is rendered
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    
    // Check if custom class is applied
    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass('custom-class');
  });

  test('renders without optional props', () => {
    const { icon, title, description } = mockProps;
    render(<FeatureCard icon={icon} title={title} description={description} />);
    
    // Check if title is rendered
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument();
    
    // Check if icon is rendered
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});
