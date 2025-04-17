# How to Create a New Component

This guide will walk you through the process of creating a new component in our Next.js project.

## Prerequisites

- Basic knowledge of React and Next.js
- Familiarity with the project structure

## Component Types

In our project, we have three main types of components:

1. **UI Components**: Basic, reusable UI elements (buttons, inputs, cards, etc.)
2. **Custom Components**: Application-specific components that may use multiple UI components
3. **Animation Components**: Components that handle animations and transitions

## Steps to Create a New UI Component

### 1. Determine the Component Location

UI components should be placed in the `components/ui` directory.

### 2. Create the Component File

Create a new file with a descriptive name using kebab-case:

```jsx
// components/ui/progress-bar.jsx

import React from 'react';
import { cn } from '@/lib/utils';

export function ProgressBar({ 
  value, 
  max = 100, 
  className, 
  ...props 
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div 
      className={cn(
        "w-full h-2 bg-secondary rounded-full overflow-hidden",
        className
      )} 
      {...props}
    >
      <div 
        className="h-full bg-primary rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}
```

### 3. Add Exports to Index File (Optional)

If you want to make your component available through a barrel export, add it to the appropriate index file:

```jsx
// components/ui/index.js

// ... existing exports
export { ProgressBar } from './progress-bar';
```

## Steps to Create a New Custom Component

### 1. Determine the Component Location

Custom components should be placed in the `components/custom` directory.

### 2. Create the Component File

Create a new file with a descriptive name using kebab-case:

```jsx
// components/custom/data-stats-card.jsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';

export function DataStatsCard({ 
  title, 
  value, 
  target, 
  description, 
  className, 
  ...props 
}) {
  const percentage = (value / target) * 100;
  
  return (
    <Card className={className} {...props}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
        <div className="mt-4">
          <ProgressBar value={value} max={target} />
          <p className="text-xs text-muted-foreground mt-1">
            {percentage.toFixed(0)}% of target ({target.toLocaleString()})
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Best Practices for Component Creation

### Use Client Directive When Needed

If your component uses React hooks or browser APIs, add the "use client" directive at the top of the file:

```jsx
"use client";

// Component code...
```

### Use Composition

Break down complex components into smaller, reusable parts:

```jsx
function ComplexComponent() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

function Header() { /* ... */ }
function Content() { /* ... */ }
function Footer() { /* ... */ }
```

### Use Props for Configuration

Make your components configurable through props:

```jsx
function Button({ variant = "primary", size = "medium", children, ...props }) {
  // Use variant and size to determine styling
  return (
    <button className={`btn btn-${variant} btn-${size}`} {...props}>
      {children}
    </button>
  );
}
```

### Add PropTypes or TypeScript Types

Document the expected props with PropTypes or TypeScript:

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, email, avatar }) {
  // Component code...
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};
```

Or with TypeScript:

```tsx
interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

function UserCard({ name, email, avatar }: UserCardProps) {
  // Component code...
}
```

### Use Tailwind CSS for Styling

Our project uses Tailwind CSS for styling. Use Tailwind classes for consistent styling:

```jsx
function Alert({ type = "info", children }) {
  const styles = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };
  
  return (
    <div className={`p-4 rounded-md border ${styles[type]}`}>
      {children}
    </div>
  );
}
```

## Testing Your Component

After creating your component, it's a good practice to write tests for it. See the [How to Write Unit Tests](./write-unit-tests.md) guide for more information.

## Example Usage

Here's how you might use the components we created in this guide:

```jsx
import { DataStatsCard } from '@/components/custom/data-stats-card';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DataStatsCard 
        title="Total Users" 
        value={1234} 
        target={2000} 
        description="Total registered users this month" 
      />
      <DataStatsCard 
        title="Active Sessions" 
        value={567} 
        target={1000} 
        description="Current active sessions" 
      />
      {/* More cards... */}
    </div>
  );
}
```

## Related Resources

- [How to Add a New Page](./add-new-page.md)
- [How to Write Unit Tests](./write-unit-tests.md)
- [UI Components Reference](../reference/ui-components.md)
