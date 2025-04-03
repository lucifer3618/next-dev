# CI/CD Pipeline Documentation

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Next-Dev project.

## Workflows

### CI Workflow (`ci.yml`)

The CI workflow runs on every push to the `main` and `develop` branches, as well as on pull requests to these branches. It consists of the following jobs:

1. **Lint**: Runs ESLint to check code quality and style.
2. **Test**: Runs Jest tests and generates coverage reports.
3. **Build**: Builds the Next.js application and uploads the build artifacts.

### CD Workflow (`cd.yml`)

The CD workflow handles deployments to different environments:

1. **Deploy to Staging**: Automatically deploys to the staging environment when code is pushed to the `main` branch.
2. **Deploy to Production**: Deploys to production when manually triggered via workflow dispatch. This job runs only after the staging deployment is successful.

### Preview Workflow (`preview.yml`)

The preview workflow creates temporary deployments for pull requests:

1. **Deploy PR Preview**: Creates a preview deployment for each pull request, with a unique URL based on the PR number.

### Security Workflow (`security.yml`)

The security workflow runs security checks:

1. **Dependency Review**: Reviews dependencies for security vulnerabilities.
2. **CodeQL Analysis**: Performs static code analysis to find security issues.
3. **NPM Audit**: Runs npm audit to check for vulnerable dependencies.

### Cache Invalidation Workflow (`cache-invalidation.yml`)

This workflow runs when dependencies change:

1. **Invalidate Cache**: Triggers cache invalidation when `package.json` or `package-lock.json` changes.

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

1. **Pull Request**: Creates a preview deployment for testing changes.
2. **Merge to Main**: Automatically deploys to staging.
3. **Manual Promotion**: Manually trigger the CD workflow to deploy to production.

## Monitoring and Rollbacks

- Deployments are monitored through Vercel's dashboard.
- Rollbacks can be performed by redeploying a previous build in Vercel or by reverting commits and pushing to the main branch.
