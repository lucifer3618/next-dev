# UI Components Reference

This document provides a comprehensive reference for the UI components available in the project. These components form the foundation of our design system and are built using Radix UI primitives with Tailwind CSS styling.

## Component Categories

Our UI components are organized into the following categories:

1. **Layout Components**: Components for structuring page layouts
2. **Input Components**: Components for user input and form elements
3. **Display Components**: Components for displaying content
4. **Navigation Components**: Components for navigation
5. **Feedback Components**: Components for user feedback and notifications
6. **Overlay Components**: Components that overlay the UI

## Layout Components

### Card

A container component with a header, content, and footer.

**Import**:
```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
```

**Props**:
- `className`: Additional CSS classes
- All HTML div props are also supported

**Example**:
```jsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <p>Card footer</p>
  </CardFooter>
</Card>
```

### Separator

A horizontal or vertical separator line.

**Import**:
```jsx
import { Separator } from "@/components/ui/separator";
```

**Props**:
- `orientation`: "horizontal" (default) or "vertical"
- `className`: Additional CSS classes
- All HTML div props are also supported

**Example**:
```jsx
<div className="space-y-4">
  <div>Content above</div>
  <Separator />
  <div>Content below</div>
</div>
```

### ScrollArea

A scrollable area with custom scrollbars.

**Import**:
```jsx
import { ScrollArea } from "@/components/ui/scroll-area";
```

**Props**:
- `className`: Additional CSS classes
- `viewportClassName`: Classes for the viewport
- `orientation`: "vertical" (default), "horizontal", or "both"
- All HTML div props are also supported

**Example**:
```jsx
<ScrollArea className="h-[200px] w-full rounded-md border p-4">
  <div className="space-y-4">
    <p>Scrollable content</p>
    {/* More content */}
  </div>
</ScrollArea>
```

## Input Components

### Button

A clickable button element.

**Import**:
```jsx
import { Button } from "@/components/ui/button";
```

**Props**:
- `variant`: "default", "destructive", "outline", "secondary", "ghost", "link"
- `size`: "default", "sm", "lg", "icon"
- `asChild`: Boolean to render as a child component
- All HTML button props are also supported

**Example**:
```jsx
<Button variant="default" size="default">
  Click me
</Button>
```

### Input

A text input field.

**Import**:
```jsx
import { Input } from "@/components/ui/input";
```

**Props**:
- `type`: Input type (text, password, email, etc.)
- All HTML input props are also supported

**Example**:
```jsx
<Input type="email" placeholder="Email" />
```

### Label

A label for form elements.

**Import**:
```jsx
import { Label } from "@/components/ui/label";
```

**Props**:
- `htmlFor`: ID of the associated form element
- All HTML label props are also supported

**Example**:
```jsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

## Display Components

### Avatar

A user avatar component.

**Import**:
```jsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
```

**Props**:
- `className`: Additional CSS classes
- All HTML div props are also supported

**Example**:
```jsx
<Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Tabs

A tabbed interface component.

**Import**:
```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
```

**Props**:
- `defaultValue`: The default selected tab
- `value`: The controlled value of the selected tab
- `onValueChange`: Callback when the selected tab changes
- `orientation`: "horizontal" (default) or "vertical"
- `className`: Additional CSS classes

**Example**:
```jsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>
```

## Navigation Components

### DropdownMenu

A dropdown menu component.

**Import**:
```jsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
```

**Props**:
- `open`: Boolean to control the open state
- `onOpenChange`: Callback when the open state changes
- `modal`: Boolean to enable modal behavior

**Example**:
```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Feedback Components

### Tooltip

A tooltip component for displaying additional information.

**Import**:
```jsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
```

**Props**:
- `delayDuration`: Delay before showing the tooltip (in ms)
- `open`: Boolean to control the open state
- `onOpenChange`: Callback when the open state changes

**Example**:
```jsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Tooltip content</p>
  </TooltipContent>
</Tooltip>
```

## Overlay Components

### Dialog

A dialog component for modal interactions.

**Import**:
```jsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
```

**Props**:
- `open`: Boolean to control the open state
- `onOpenChange`: Callback when the open state changes
- `modal`: Boolean to enable modal behavior (default: true)

**Example**:
```jsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description goes here.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">Dialog content</div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Collapsible

A component that can be expanded or collapsed.

**Import**:
```jsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
```

**Props**:
- `open`: Boolean to control the open state
- `onOpenChange`: Callback when the open state changes
- `defaultOpen`: Boolean to set the default open state

**Example**:
```jsx
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="p-4">
      Collapsible content
    </div>
  </CollapsibleContent>
</Collapsible>
```

## Component Composition

Many of our UI components are designed to be composed together to create more complex interfaces. Here's an example of component composition:

```jsx
<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>Manage your profile information</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="john.doe@example.com" />
      </div>
    </div>
  </CardContent>
  <CardFooter className="flex justify-end space-x-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

## Styling Components

All components accept a `className` prop that can be used to apply additional styles using Tailwind CSS:

```jsx
<Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
  Gradient Button
</Button>
```

For more complex styling needs, you can use the `cn` utility function from `@/lib/utils`:

```jsx
import { cn } from "@/lib/utils";

function CustomButton({ className, variant, ...props }) {
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
  };
  
  return (
    <Button 
      className={cn(variantStyles[variant], className)} 
      {...props} 
    />
  );
}
```

## Accessibility

All UI components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader support

Always maintain these accessibility features when using or extending these components.

## Related Documentation

- [Custom Components Reference](./custom-components.md)
- [Animation Components Reference](./animation-components.md)
- [Component Design Philosophy](../explanation/component-design.md)
