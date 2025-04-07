import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

// Mock the Slot component from @radix-ui/react-slot
jest.mock('@radix-ui/react-slot', () => ({
  Slot: ({ children, className, ...props }) => (
    <div className={className} data-testid="slot-component" {...props}>
      {children}
    </div>
  ),
}));

describe('Button Component', () => {
  test('renders button with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    
    // Check if default classes are applied
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-primary-foreground');
  });

  test('renders button with custom variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toBeInTheDocument();
    
    // Check if destructive variant classes are applied
    expect(button).toHaveClass('bg-destructive');
    expect(button).toHaveClass('text-white');
  });

  test('renders button with custom size', () => {
    render(<Button size="sm">Small Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Small Button' });
    expect(button).toBeInTheDocument();
    
    // Check if small size classes are applied
    expect(button).toHaveClass('h-8');
    expect(button).toHaveClass('rounded-md');
  });

  test('renders as child when asChild prop is true', () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>
    );
    
    // When asChild is true, it should render the Slot component
    const slotComponent = screen.getByTestId('slot-component');
    expect(slotComponent).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Custom Button' });
    expect(button).toBeInTheDocument();
    
    // Check if custom class is applied
    expect(button).toHaveClass('custom-class');
  });

  test('passes additional props to button element', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeInTheDocument();
    
    // Check if disabled attribute is applied
    expect(button).toBeDisabled();
  });
});
