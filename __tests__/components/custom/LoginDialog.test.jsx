import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginDialog from '@/components/custom/LoginDialog';

// Mock the dependencies
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}));

jest.mock('@react-oauth/google', () => ({
  useGoogleLogin: () => jest.fn(),
}));

jest.mock('convex/react', () => ({
  useMutation: () => jest.fn(),
}));

jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('uuid4', () => jest.fn().mockReturnValue('mock-uuid'));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Mock the UI components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }) => (
    <div data-testid="mock-dialog" data-open={open} onClick={() => onOpenChange(false)}>
      {children}
    </div>
  ),
  DialogContent: ({ children, className }) => (
    <div data-testid="mock-dialog-content" className={className}>
      {children}
    </div>
  ),
  DialogHeader: ({ children, className }) => (
    <div data-testid="mock-dialog-header" className={className}>
      {children}
    </div>
  ),
  DialogTitle: ({ children, className }) => (
    <div data-testid="mock-dialog-title" className={className}>
      {children}
    </div>
  ),
  DialogDescription: ({ children }) => (
    <div data-testid="mock-dialog-description">
      {children}
    </div>
  ),
  DialogTrigger: ({ children }) => (
    <div data-testid="mock-dialog-trigger">
      {children}
    </div>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }) => (
    <button
      data-testid="mock-button"
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

// Mock the context
const mockSetUserData = jest.fn();
const mockUserContextValue = {
  userData: null,
  setUserData: mockSetUserData
};

// Setup the context wrapper
const renderWithContext = (ui, contextValue = mockUserContextValue) => {
  // Mock the useContext hook to return our mock values
  jest.spyOn(React, 'useContext').mockImplementation(() => contextValue);

  return render(ui);
};

describe('LoginDialog Component', () => {
  const mockProps = {
    openDialog: true,
    closeDialog: jest.fn(),
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  test('renders login dialog when open', () => {
    renderWithContext(<LoginDialog {...mockProps} />);

    // Check if the dialog is rendered and open
    const dialog = screen.getByTestId('mock-dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('data-open', 'true');

    // Check if the logo is rendered
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    // Check if the title contains "NextDev"
    expect(screen.getByText(/Continue With Next/i)).toBeInTheDocument();

    // Check if the sign in button is rendered
    const signInButton = screen.getByText(/Sign in with google/i);
    expect(signInButton).toBeInTheDocument();

    // Check if the terms text is rendered
    expect(screen.getByText(/By signing in, you agree to our/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });

  test('does not render dialog content when closed', () => {
    renderWithContext(<LoginDialog {...mockProps} openDialog={false} />);

    // Check if the dialog is rendered but closed
    const dialog = screen.getByTestId('mock-dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('data-open', 'false');
  });

  test('calls closeDialog when dialog is clicked', () => {
    renderWithContext(<LoginDialog {...mockProps} />);

    // Click the dialog
    const dialog = screen.getByTestId('mock-dialog');
    fireEvent.click(dialog);

    // Check if closeDialog was called
    expect(mockProps.closeDialog).toHaveBeenCalled();
  });

  test('renders Google sign-in button with correct icon based on theme', () => {
    renderWithContext(<LoginDialog {...mockProps} />);

    // Check if the Google sign-in button is rendered
    const signInButton = screen.getByText(/Sign in with google/i);
    expect(signInButton).toBeInTheDocument();

    // Check if the Google icon is rendered with the dark theme
    const googleIcons = screen.getAllByRole('img');
    const googleIcon = googleIcons.find(img => img.getAttribute('src') === '/google-dark.svg');
    expect(googleIcon).toBeInTheDocument();
    expect(googleIcon).toHaveAttribute('src', '/google-dark.svg');
  });
});
