# Testing Guide for Next-Dev Project

This document provides information on how to run and write tests for the Next-Dev project.

## Test Structure

The tests are organized in a structure that mirrors the project's source code:

```
__tests__/
├── components/
│   ├── custom/
│   │   ├── FeatureCard.test.jsx
│   │   └── Hero.test.jsx
│   └── ui/
│       └── button.test.jsx
├── hooks/
│   └── use-mobile.test.js
└── lib/
    └── utils.test.js
```

## Running Tests

You can run tests using the following npm scripts:

```bash
# Run all tests
npm test

# Run tests in watch mode (tests will re-run when files change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run a specific test file
npx jest path/to/test/file.test.js
```

## Writing Tests

### Component Tests

When writing tests for components:

1. Import the component and testing utilities:
   ```jsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import YourComponent from '@/components/path/to/YourComponent';
   ```

2. Mock any dependencies the component uses:
   ```jsx
   jest.mock('next/router', () => ({
     useRouter: () => ({
       push: jest.fn(),
     }),
   }));
   ```

3. Write test cases that render the component and assert on its behavior:
   ```jsx
   test('renders with correct props', () => {
     render(<YourComponent prop1="value1" />);
     expect(screen.getByText('Expected Text')).toBeInTheDocument();
   });
   ```

### Hook Tests

When testing hooks:

1. Import the hook and testing utilities:
   ```jsx
   import { renderHook, act } from '@testing-library/react';
   import { useYourHook } from '@/hooks/your-hook';
   ```

2. Write test cases that render the hook and assert on its behavior:
   ```jsx
   test('hook returns expected value', () => {
     const { result } = renderHook(() => useYourHook());
     expect(result.current).toBe(expectedValue);
   });
   ```

### Utility Tests

For utility functions:

1. Import the utility function:
   ```jsx
   import { yourUtilFunction } from '@/lib/utils';
   ```

2. Write test cases that call the function and assert on its return value:
   ```jsx
   test('utility function returns expected value', () => {
     expect(yourUtilFunction('input')).toBe('expected output');
   });
   ```

## Mocking

### Mocking Components

```jsx
jest.mock('@/components/SomeComponent', () => {
  return function MockComponent(props) {
    return <div data-testid="mock-component" {...props} />;
  };
});
```

### Mocking Hooks

```jsx
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));
```

### Mocking Context

```jsx
const mockContextValue = { value: 'test', setValue: jest.fn() };
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockContextValue,
}));
```

## Best Practices

1. Test component behavior, not implementation details
2. Use data-testid attributes for elements that don't have accessible roles or text
3. Mock external dependencies
4. Keep tests simple and focused on one behavior
5. Use setup and teardown functions to avoid repetition
6. Test edge cases and error conditions
