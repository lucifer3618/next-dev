import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '@/components/custom/Loading';

// Mock the dependencies
jest.mock('next/dynamic', () => jest.fn(() => () => <div data-testid="mock-lottie">Lottie Animation</div>));

jest.mock('@/data/Animation', () => ({
  loadingAnimation: { frames: [] },
}));

describe('Loading Component', () => {
  test('renders loading component with animation', () => {
    render(<Loading />);
    
    // Check if the loading container is rendered
    const loadingContainer = screen.getByTestId('mock-lottie').parentElement.parentElement;
    expect(loadingContainer).toBeInTheDocument();
    expect(loadingContainer).toHaveClass('absolute inset-0 flex items-center justify-center');
    
    // Check if the Lottie animation is rendered
    const lottieAnimation = screen.getByTestId('mock-lottie');
    expect(lottieAnimation).toBeInTheDocument();
    expect(lottieAnimation).toHaveTextContent('Lottie Animation');
  });

  test('has proper styling for backdrop', () => {
    render(<Loading />);
    
    // Check if the loading container has the proper backdrop styling
    const loadingContainer = screen.getByTestId('mock-lottie').parentElement.parentElement;
    expect(loadingContainer).toHaveClass('bg-black/50 backdrop-blur-md z-50');
  });
});
