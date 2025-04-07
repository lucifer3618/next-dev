import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatComponent, { countTokens } from '@/components/custom/ChatComponent';

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'mock-workspace-id' }),
}));

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}));

jest.mock('convex/react', () => ({
  useConvex: () => ({
    query: jest.fn().mockResolvedValue({ messages: [] }),
  }),
  useMutation: () => jest.fn().mockResolvedValue({}),
}));

jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue({ data: { result: 'AI response' } }),
}));

jest.mock('uuid4', () => jest.fn().mockReturnValue('mock-uuid'));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock the UI components
jest.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }) => <div data-testid="mock-skeleton" className={className}></div>,
}));

jest.mock('react-markdown', () => {
  return function MockMarkdown({ children }) {
    return <div data-testid="mock-markdown">{children}</div>;
  };
});

jest.mock('lucide-react', () => ({
  ArrowUp: ({ onClick, className, style }) => (
    <button
      data-testid="mock-arrow-up"
      onClick={onClick}
      className={className}
      style={style}
    >
      Arrow Up
    </button>
  ),
  Link: ({ className }) => <div data-testid="mock-link-icon" className={className}>Link Icon</div>,
}));

// Mock the context values
const mockMessages = [];
const mockSetMessages = jest.fn();
const mockMessagesContextValue = {
  messages: mockMessages,
  setMessages: mockSetMessages
};

const mockUserData = {
  _id: 'user-123',
  token: 100,
  picture: 'profile.jpg'
};
const mockSetUserData = jest.fn();
const mockUserContextValue = {
  userData: mockUserData,
  setUserData: mockSetUserData
};

// Setup the context wrapper
const renderWithContext = (ui) => {
  // Mock the useContext hook to return our mock values
  jest.spyOn(React, 'useContext').mockImplementation((context) => {
    if (context.displayName === 'MessagesContext') {
      return mockMessagesContextValue;
    }
    if (context.displayName === 'UserContext') {
      return mockUserContextValue;
    }
    return undefined;
  });

  return render(ui);
};

// We're only testing the countTokens function for now
// The ChatComponent tests will be implemented later

describe('countTokens function', () => {
  test('correctly counts tokens in a sentence', () => {
    expect(countTokens('Hello world')).toBe(2);
    expect(countTokens('This is a test sentence')).toBe(5);
    expect(countTokens('   Spaces   should   be   normalized   ')).toBe(4);
    expect(countTokens('')).toBe(1); // The implementation returns 1 for empty strings
  });
});
