# How to Deploy to Vercel

This guide will walk you through the process of deploying your Next.js application to Vercel.

## Prerequisites

- A GitHub, GitLab, or Bitbucket repository containing your Next.js project
- A Vercel account (you can sign up at [vercel.com](https://vercel.com))
- Your environment variables ready for configuration

## Step 1: Connect Your Repository to Vercel

1. Log in to your Vercel account
2. Click on "Add New..." and select "Project"
3. Import your Git repository:
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Vercel to access your repositories if prompted
   - Select the repository containing your Next.js project

## Step 2: Configure Your Project

After importing your repository, you'll be taken to the project configuration page:

1. **Project Name**: Vercel will suggest a name based on your repository. You can keep it or change it.

2. **Framework Preset**: Vercel should automatically detect that you're using Next.js. If not, select "Next.js" from the dropdown.

3. **Root Directory**: If your Next.js project is not in the root of your repository, specify the directory here.

4. **Build and Output Settings**: The default settings should work for most Next.js projects:
   - Build Command: `npm run build` or `next build`
   - Output Directory: `.next`
   - Install Command: `npm install` or `yarn install`

## Step 3: Configure Environment Variables

1. Expand the "Environment Variables" section
2. Add all the environment variables required by your application:
   - Click "Add Variable"
   - Enter the name and value of each environment variable
   - Select the environments where each variable should be available (Production, Preview, Development)

For our project, you'll need to add at least these variables:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CONVEX_DEPLOYMENT=your_convex_deployment_url
```

## Step 4: Deploy Your Project

1. Click the "Deploy" button
2. Vercel will start the deployment process:
   - Cloning your repository
   - Installing dependencies
   - Building your application
   - Deploying to the Vercel network

3. Once the deployment is complete, you'll see a success message and a link to your deployed application

## Step 5: Verify Your Deployment

1. Click on the deployment URL to open your application
2. Test the key functionality of your application to ensure everything works as expected
3. Check the Vercel dashboard for any build warnings or errors

## Configuring Custom Domains

To add a custom domain to your Vercel deployment:

1. Go to your project in the Vercel dashboard
2. Click on "Settings" and then "Domains"
3. Click "Add" and enter your domain name
4. Follow the instructions to configure your DNS settings

## Setting Up Continuous Deployment

Vercel automatically sets up continuous deployment for your project:

1. When you push changes to your main branch, Vercel will automatically deploy to production
2. When you create a pull request, Vercel will create a preview deployment

You can customize this behavior in the "Git Integration" section of your project settings.

## Deployment Troubleshooting

### Build Failures

If your build fails, check the build logs for errors:

1. Go to your project in the Vercel dashboard
2. Click on the failed deployment
3. Click on "View Build Logs"
4. Look for error messages that indicate what went wrong

Common issues include:
- Missing dependencies
- Environment variable issues
- Build script errors

### Runtime Errors

If your application deploys but doesn't work correctly:

1. Check the browser console for JavaScript errors
2. Verify that all environment variables are correctly set
3. Check that API endpoints and external services are accessible from Vercel

### Environment Variable Issues

If you're having issues with environment variables:

1. Make sure all required variables are set in the Vercel dashboard
2. Check that variables are correctly prefixed with `NEXT_PUBLIC_` if they need to be accessible in the browser
3. Redeploy your application after making changes to environment variables

## Related Resources

- [How to Set Up CI/CD](./setup-cicd.md)
- [How to Configure Production Builds](./configure-production-builds.md)
- [Environment Variables Reference](../reference/environment-variables.md)
