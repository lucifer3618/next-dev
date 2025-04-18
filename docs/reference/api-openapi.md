# API Documentation (OpenAPI 3.0)

This document provides API documentation in OpenAPI 3.0 format for the Next.js Project.

## Overview

The API provides endpoints for AI-powered features including chat and code generation.

- **Version:** 0.1.3
- **Base URLs:**
  - Production: `https://next-dev-ruby.vercel.app`
  - Development: `http://localhost:3000`

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

## Rate Limits

API endpoints are subject to rate limiting to prevent abuse:

- Authentication endpoints: 10 requests per minute
- User endpoints: 60 requests per minute
- Project endpoints: 120 requests per minute
- AI endpoints: 30 requests per minute

When a rate limit is exceeded, the API will respond with a 429 Too Many Requests status code.

## API Endpoints

### AI Chat

#### `POST /api/ai-chat`

Send a message to the AI chat and receive a response. The AI is powered by Google's Gemini model.

**Request Body:**

```json
{
  "prompt": "How do I create a React component?"
}
```

**Response:**

```json
{
  "result": "To create a React component, you can use either a function or a class..."
}
```

**Status Codes:**

| Status Code | Description |
|-------------|-------------|
| 200 | Successful response |
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 429 | Rate limited |
| 500 | Internal server error |

### Code Generation

#### `POST /api/gen-ai-code`

Generate code using AI. The AI is powered by Google's Gemini model.

**Request Body:**

```json
{
  "prompt": "Generate a React component that displays a user profile"
}
```

**Response:**

```json
{
  "files": {
    "UserProfile.jsx": "import React from 'react';\n\nconst UserProfile = ({ user }) => {\n  return (\n    <div className=\"user-profile\">\n      <h2>{user.name}</h2>\n      <p>{user.email}</p>\n    </div>\n  );\n};\n\nexport default UserProfile;"
  }
}
```

**Status Codes:**

| Status Code | Description |
|-------------|-------------|
| 200 | Successful response |
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 429 | Rate limited |
| 500 | Internal server error |

## Database API

The application also uses Convex for database operations. These are not REST API endpoints but are accessed through the Convex client library.

### Users

- `users.CreateUser`: Create a new user
- `users.GetUser`: Get user by email

### Workspace

- `workspace.CreateWorkspace`: Create a new workspace
- `workspace.GetWorkspace`: Get workspace by ID
- `workspace.UpdateMessages`: Update messages in a workspace
- `workspace.UpdateFiles`: Update files in a workspace
- `workspace.GetAllWorkspace`: Get all workspaces for a user

For more details on the database API, refer to the [Convex Database Schema](./convex-schema.md) documentation.

## OpenAPI Specification

The complete OpenAPI 3.0 specification is available in YAML format at [openapi.yaml](./openapi.yaml).

You can view this specification in tools like [Swagger UI](https://swagger.io/tools/swagger-ui/) or [Redoc](https://redocly.github.io/redoc/) for an interactive experience.
