# Building Your First Feature

This tutorial will guide you through building your first feature in our Next.js project. By the end of this tutorial, you'll have created a new page with a custom component that fetches and displays data.

## Prerequisites

Before starting this tutorial, make sure you have:
- Completed the [Getting Started](./getting-started.md) tutorial
- Basic knowledge of React and Next.js
- Familiarity with JavaScript/TypeScript

## What We'll Build

In this tutorial, we'll build a simple "User Profile" feature that:
1. Creates a new page at `/profile`
2. Builds a custom profile card component
3. Fetches user data from an API
4. Displays the user profile information

## Step 1: Create a New Page

First, let's create a new page for our user profile:

1. Navigate to the `app` directory
2. Create a new folder called `profile`
3. Inside the `profile` folder, create a file called `page.jsx`

Add the following code to `app/profile/page.jsx`:

```jsx
export const metadata = {
  title: 'User Profile',
  description: 'View and manage your user profile',
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-card rounded-lg p-6 shadow-md">
        <p>Profile content will go here</p>
      </div>
    </div>
  );
}
```

## Step 2: Create a Profile Card Component

Now, let's create a custom component for displaying the user profile:

1. Navigate to the `components/custom` directory
2. Create a new file called `profile-card.jsx`

Add the following code to `components/custom/profile-card.jsx`:

```jsx
"use client";

import { useState, useEffect } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export function ProfileCard({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/users/${userId}`);
        // const data = await response.json();
        
        // For this tutorial, we'll use mock data
        const mockUser = {
          id: userId || '1',
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          role: 'Developer',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
          joinedDate: 'January 2023'
        };
        
        // Simulate network delay
        setTimeout(() => {
          setUser(mockUser);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load user profile');
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading profile...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto border-destructive">
        <CardContent className="pt-6">
          <p className="text-center text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16">
          <img src={user.avatar} alt={user.name} />
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <Label className="text-muted-foreground">Email</Label>
            <div className="col-span-2">{user.email}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Label className="text-muted-foreground">Member Since</Label>
            <div className="col-span-2">{user.joinedDate}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Step 3: Use the Profile Card Component in the Page

Now, let's update our profile page to use the new component:

Update `app/profile/page.jsx` with the following code:

```jsx
import { ProfileCard } from '@/components/custom/profile-card';

export const metadata = {
  title: 'User Profile',
  description: 'View and manage your user profile',
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <ProfileCard userId="1" />
    </div>
  );
}
```

## Step 4: Test Your New Feature

Now, let's test our new feature:

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/profile
   ```

3. You should see your new profile page with the profile card component displaying the mock user data!

## Step 5: Add Some Interactivity

Let's add a simple edit button to our profile card:

Update `components/custom/profile-card.jsx` by adding a button to the card header:

```jsx
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

// ... existing imports

export function ProfileCard({ userId }) {
  // ... existing state and effects
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    // In a real app, you would show an edit form here
    alert('Edit functionality would be implemented here');
  };

  // ... loading and error states
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <img src={user.avatar} alt={user.name} />
          </Avatar>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.role}</p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={handleEditClick}>
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      {/* ... rest of the component */}
    </Card>
  );
}
```

## What You've Learned

Congratulations! You've successfully built your first feature in our Next.js project. In this tutorial, you've learned how to:

1. Create a new page in a Next.js app
2. Build a custom component with state management
3. Simulate data fetching with useEffect
4. Handle loading and error states
5. Add basic interactivity to your component

## Next Steps

Now that you've built your first feature, here are some ways you can extend it:

- Implement a real API endpoint to fetch user data
- Create a form to edit the user profile
- Add more sections to the profile page
- Implement authentication to show the current user's profile

For more tutorials, check out [Working with Components](./working-with-components.md) or explore the [How-to Guides](../how-to-guides/index.md) for specific tasks.
