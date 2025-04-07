import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

describe('useIsMobile hook', () => {
  const originalInnerWidth = window.innerWidth;
  
  afterEach(() => {
    // Reset window.innerWidth to its original value after each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth
    });
  });
  
  test('should return false when window width is greater than or equal to 768px', () => {
    // Set window width to be greater than the mobile breakpoint
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024
    });
    
    // Mock the matchMedia implementation
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
    
    const { result } = renderHook(() => useIsMobile());
    
    // Initial value should be false for desktop
    expect(result.current).toBe(false);
  });
  
  test('should return true when window width is less than 768px', () => {
    // Set window width to be less than the mobile breakpoint
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 767
    });
    
    // Mock the matchMedia implementation
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
    
    const { result } = renderHook(() => useIsMobile());
    
    // Initial value should be true for mobile
    expect(result.current).toBe(true);
  });
  
  test('should update value when window size changes', () => {
    // Start with desktop size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024
    });
    
    // Create a mock for matchMedia
    const mockMatchMedia = {
      matches: false,
      media: '',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };
    
    window.matchMedia = jest.fn().mockImplementation(() => mockMatchMedia);
    
    const { result } = renderHook(() => useIsMobile());
    
    // Initial value should be false for desktop
    expect(result.current).toBe(false);
    
    // Simulate window resize to mobile size
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 767
      });
      
      // Trigger the change event listener
      const changeEvent = mockMatchMedia.addEventListener.mock.calls[0][1];
      changeEvent();
    });
    
    // Value should now be true for mobile
    expect(result.current).toBe(true);
  });
});
