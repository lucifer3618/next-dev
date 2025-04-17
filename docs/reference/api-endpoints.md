# API Endpoints Reference

This document provides a comprehensive reference for all API endpoints available in the application.

## API Structure

The API is organized using Next.js App Router API routes, located in the `/app/api` directory. Each endpoint follows the pattern:

```
/api/[resource]/[action]
```

## Authentication

Most API endpoints require authentication. Include an authentication token in the request headers:

```
Authorization: Bearer <token>
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "details": {} // Optional additional details
  }
}
```

Common error codes:
- `unauthorized`: Authentication required or invalid credentials
- `forbidden`: Insufficient permissions
- `not_found`: Resource not found
- `validation_error`: Invalid request parameters
- `rate_limited`: Too many requests
- `internal_error`: Server error

## API Endpoints

### User Management

#### `GET /api/users/me`

Retrieves the current user's profile information.

**Authentication Required**: Yes

**Response**:
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "avatar": "https://example.com/avatar.jpg",
  "role": "user",
  "createdAt": "2023-01-01T00:00:00Z"
}
```

#### `PUT /api/users/me`

Updates the current user's profile information.

**Authentication Required**: Yes

**Request Body**:
```json
{
  "name": "John Smith",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response**:
```json
{
  "id": "user_123",
  "name": "John Smith",
  "email": "john.doe@example.com",
  "avatar": "https://example.com/new-avatar.jpg",
  "role": "user",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-02T00:00:00Z"
}
```

### Authentication

#### `POST /api/auth/login`

Authenticates a user and returns a token.

**Authentication Required**: No

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

#### `POST /api/auth/logout`

Invalidates the current user's token.

**Authentication Required**: Yes

**Response**:
```json
{
  "success": true
}
```

### Projects

#### `GET /api/projects`

Retrieves a list of projects accessible to the current user.

**Authentication Required**: Yes

**Query Parameters**:
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `sort` (optional): Field to sort by (default: "createdAt")
- `order` (optional): Sort order, "asc" or "desc" (default: "desc")

**Response**:
```json
{
  "data": [
    {
      "id": "project_123",
      "name": "My Project",
      "description": "Project description",
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-02T00:00:00Z"
    },
    // More projects...
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

#### `POST /api/projects`

Creates a new project.

**Authentication Required**: Yes

**Request Body**:
```json
{
  "name": "New Project",
  "description": "Project description"
}
```

**Response**:
```json
{
  "id": "project_456",
  "name": "New Project",
  "description": "Project description",
  "createdAt": "2023-01-03T00:00:00Z",
  "updatedAt": "2023-01-03T00:00:00Z"
}
```

#### `GET /api/projects/:id`

Retrieves a specific project by ID.

**Authentication Required**: Yes

**Path Parameters**:
- `id`: Project ID

**Response**:
```json
{
  "id": "project_123",
  "name": "My Project",
  "description": "Project description",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-02T00:00:00Z",
  "members": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "owner"
    },
    // More members...
  ]
}
```

#### `PUT /api/projects/:id`

Updates a specific project.

**Authentication Required**: Yes

**Path Parameters**:
- `id`: Project ID

**Request Body**:
```json
{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

**Response**:
```json
{
  "id": "project_123",
  "name": "Updated Project Name",
  "description": "Updated description",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-03T00:00:00Z"
}
```

#### `DELETE /api/projects/:id`

Deletes a specific project.

**Authentication Required**: Yes

**Path Parameters**:
- `id`: Project ID

**Response**:
```json
{
  "success": true
}
```

### AI Integration

#### `POST /api/ai/generate`

Generates content using the Gemini AI model.

**Authentication Required**: Yes

**Request Body**:
```json
{
  "prompt": "Generate a React component that displays a user profile",
  "options": {
    "temperature": 0.7,
    "maxTokens": 1000
  }
}
```

**Response**:
```json
{
  "content": "```jsx\nimport React from 'react';\n\nfunction UserProfile({ user }) {\n  return (\n    <div className=\"user-profile\">\n      <img src={user.avatar} alt={user.name} />\n      <h2>{user.name}</h2>\n      <p>{user.bio}</p>\n    </div>\n  );\n}\n\nexport default UserProfile;\n```",
  "usage": {
    "promptTokens": 10,
    "completionTokens": 120,
    "totalTokens": 130
  }
}
```

## Rate Limits

API endpoints are subject to rate limiting to prevent abuse:

- Authentication endpoints: 10 requests per minute
- User endpoints: 60 requests per minute
- Project endpoints: 120 requests per minute
- AI endpoints: 30 requests per minute

When a rate limit is exceeded, the API will respond with a 429 Too Many Requests status code and the following response:

```json
{
  "error": {
    "code": "rate_limited",
    "message": "Too many requests, please try again later",
    "details": {
      "retryAfter": 30
    }
  }
}
```

## Related Documentation

- [API Response Formats](./api-response-formats.md)
- [Error Codes and Handling](./error-codes.md)
- [Authentication Strategy](../explanation/authentication-strategy.md)
