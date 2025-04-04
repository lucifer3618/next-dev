# CI/CD Pipeline Documentation

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Next-Dev project.

## Consolidated Workflow

The CI/CD pipeline is implemented in a single workflow file (`ci-cd.yml`) that handles all aspects of the development lifecycle:

### Triggers

The workflow is triggered by:
- **Push** to `main` or `develop` branches
- **Pull Requests** to `main` or `develop` branches
- **Manual Trigger** (workflow_dispatch) with an option to deploy to production

### Jobs

1. **Lint and Test**
   - Runs ESLint for code quality checks
   - Executes Jest tests
   - Generates test coverage reports

2. **Security Scan**
   - Performs npm audit to check for vulnerable dependencies

3. **CodeQL Analysis**
   - Runs CodeQL static analysis for security vulnerabilities
   - Uses proper permissions for security events

4. **Build**
   - Builds the Next.js application
   - Uploads build artifacts for use in deployment jobs

5. **Deploy Preview** (Pull Requests only)
   - Creates a preview deployment for each pull request
   - Generates a unique URL based on the PR number

6. **Deploy to Staging** (Push to main branch only)
   - Automatically deploys to the staging environment
   - Uses the build artifacts from the build job

7. **Deploy to Production** (Manual trigger only)
   - Deploys to production when manually triggered
   - Requires explicit approval via workflow dispatch
   - Runs only after the staging deployment is successful

8. **Cache Invalidation** (Push to main branch only)
   - Checks for changes to package.json or package-lock.json
   - Triggers cache invalidation when dependencies change

## Environment Variables

The following environment variables are used in the workflows:

### Staging Environment
- `NEXT_PUBLIC_API_URL`: API URL for the staging environment
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google Client ID for authentication

### Production Environment
- `NEXT_PUBLIC_API_URL`: API URL for the production environment
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google Client ID for authentication

### Preview Environment
- `NEXT_PUBLIC_API_URL_PREVIEW`: API URL for preview deployments

## Secrets

The following secrets need to be configured in the GitHub repository:

- `VERCEL_TOKEN`: API token for Vercel deployments
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- `NEXT_PUBLIC_API_URL`: API URL for the application
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google Client ID for authentication
- `NEXT_PUBLIC_API_URL_PREVIEW`: API URL for preview deployments

## Deployment Strategy

The workflow implements a progressive deployment strategy:

1. **Pull Request**: Creates a preview deployment for testing changes
2. **Merge to Main**: Automatically deploys to staging
3. **Manual Promotion**: Manually trigger the workflow with the "deploy_to_production" option to deploy to production

## Benefits of Consolidated Workflow

- **Simplified Management**: All CI/CD processes in a single file
- **Consistent Dependencies**: All jobs use the same Node.js version and dependency installation
- **Artifact Sharing**: Build artifacts are shared between jobs
- **Clear Progression**: Clear progression from testing to staging to production
- **Manual Control**: Production deployments require explicit approval

## Monitoring and Rollbacks

- Deployments are monitored through Vercel's dashboard
- Rollbacks can be performed by redeploying a previous build in Vercel or by reverting commits and pushing to the main branch
