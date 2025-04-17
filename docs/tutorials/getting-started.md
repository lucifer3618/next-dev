# Getting Started with Next.js Project

This tutorial will guide you through setting up your development environment and running the project locally. By the end of this tutorial, you'll have a working development environment and be able to see the application running in your browser.

## Prerequisites

Before you begin, make sure you have the following installed:
- Node.js 18.x or higher
- npm 9.x or higher
- Git

## Step 1: Clone the Repository

First, let's clone the repository to your local machine:

```bash
git clone <repository-url>
cd next-dev
```

## Step 2: Install Dependencies

Next, install the project dependencies:

```bash
npm install
```

This will install all the necessary packages defined in the `package.json` file.

## Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory of the project:

```bash
touch .env.local
```

Open the `.env.local` file and add the following environment variables:

```
# API Keys
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Convex Database
CONVEX_DEPLOYMENT=your_convex_deployment_url
```

Replace the placeholder values with your actual API keys and configuration values.

## Step 4: Start the Development Server

Now, let's start the development server:

```bash
npm run dev
```

This will start the Next.js development server on port 3000.

## Step 5: View the Application

Open your browser and navigate to:

```
http://localhost:3000
```

You should now see the application running in your browser!

## Step 6: Make a Simple Change

Let's make a simple change to verify that everything is working correctly:

1. Open the file `app/page.jsx` in your code editor
2. Find the main heading text and change it to something else
3. Save the file
4. The browser should automatically refresh and show your changes

## What's Next?

Congratulations! You've successfully set up your development environment and run the project locally. Here are some next steps you might want to take:

- Continue with the [Building Your First Feature](./first-feature.md) tutorial
- Explore the [Working with Components](./working-with-components.md) tutorial
- Check out the [How-to Guides](../how-to-guides/index.md) for specific tasks

## Troubleshooting

If you encounter any issues during setup, here are some common problems and solutions:

### Node.js Version Issues

If you see errors related to Node.js version, make sure you're using Node.js 18.x or higher:

```bash
node --version
```

### Port Already in Use

If port 3000 is already in use, you can start the server on a different port:

```bash
npm run dev -- -p 3001
```

### Dependency Installation Errors

If you encounter errors during dependency installation, try clearing the npm cache and reinstalling:

```bash
npm cache clean --force
npm install
```

For more troubleshooting help, see the [Troubleshooting Guide](../how-to-guides/troubleshooting.md).
