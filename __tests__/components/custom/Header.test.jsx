import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/custom/Header';
import { UserContext } from '@/context/UserContext'; // Import UserContext

// Mock the dependencies
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}));

jest.mock('@react-oauth/google', () => ({
  googleLogout: jest.fn(),
}));

// Mock the context
const mockSetUserData = jest.fn();
const mockUserContextValue = {
  userData: null,
  setUserData: mockSetUserData
};

// Mock the components used by Header
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, size }) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      data-testid="mock-button"
    >
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, className }) => (
    <div data-testid="mock-avatar" className={className}>
      {children}
    </div>
  ),
  AvatarImage: ({ src }) => <img data-testid="mock-avatar-image" src={src} alt="avatar" />,
  AvatarFallback: ({ children, src }) => (
    <div data-testid="mock-avatar-fallback" data-src={src}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }) => <div data-testid="mock-dropdown-menu">{children}</div>,
  DropdownMenuTrigger: ({ children }) => <div data-testid="mock-dropdown-trigger">{children}</div>,
  DropdownMenuContent: ({ children, className }) => (
    <div data-testid="mock-dropdown-content" className={className}>
      {children}
    </div>
  ),
  DropdownMenuLabel: ({ children }) => <div data-testid="mock-dropdown-label">{children}</div>,
  DropdownMenuItem: ({ children, className, onClick }) => (
    <div data-testid="mock-dropdown-item" className={className} onClick={onClick}>
      {children}
    </div>
  ),
  DropdownMenuSeparator: () => <hr data-testid="mock-dropdown-separator" />,
}));

jest.mock('@/components/ui/sidebar', () => ({
  SidebarTrigger: ({ className }) => (
    <button data-testid="mock-sidebar-trigger" className={className}>
      Sidebar Trigger
    </button>
  ),
}));

jest.mock('@/components/custom/LoginDialog', () => {
  return function MockLoginDialog({ openDialog, closeDialog }) {
    return (
      <div data-testid="mock-login-dialog" onClick={closeDialog}>
        {openDialog ? 'Login Dialog Open' : 'Login Dialog Closed'}
      </div>
    );
  };
});

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  Moon: () => <div data-testid="mock-moon-icon">Moon Icon</div>,
  Sun: () => <div data-testid="mock-sun-icon">Sun Icon</div>,
}));

// Setup the context wrapper
const renderWithContext = (ui, contextValue = mockUserContextValue) => {
  // Mock the useContext hook to return our mock values
  jest.spyOn(React, 'useContext').mockImplementation((context) => {
    if (context === UserContext) {
      return contextValue;
    }
    return undefined;
  });

  return render(ui);
};

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  test('renders header with sign in button when user is not logged in', () => {
    renderWithContext(<Header />);

    // Check if the theme toggle button is rendered
    const themeButtons = screen.getAllByTestId('mock-button');
    const themeButton = themeButtons[0]; // First button is the theme toggle
    expect(themeButton).toBeInTheDocument();

    // Check if the sign in button is rendered
    const signInButton = screen.getByText('Sign in');
    expect(signInButton).toBeInTheDocument();

    // Check if the get started button is rendered
    const getStartedButton = screen.getByText('Get Started');
    expect(getStartedButton).toBeInTheDocument();

    // Check if the login dialog is rendered (but closed)
    const loginDialog = screen.getByTestId('mock-login-dialog');
    expect(loginDialog).toBeInTheDocument();
    expect(loginDialog).toHaveTextContent('Login Dialog Closed');
  });

  // Test for logged-in user will be implemented later

  test('opens login dialog when sign in button is clicked', () => {
    renderWithContext(<Header />);

    // Initially the dialog should be closed
    expect(screen.getByTestId('mock-login-dialog')).toHaveTextContent('Login Dialog Closed');

    // Click the sign in button
    const signInButton = screen.getByText('Sign in');
    fireEvent.click(signInButton);

    // The dialog should now be open
    expect(screen.getByTestId('mock-login-dialog')).toHaveTextContent('Login Dialog Open');
  });
});
