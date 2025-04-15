# CI/CD Pipeline Documentation

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Next-Dev project.

## Workflow Structure

The CI/CD pipeline is implemented in these workflow files:

1. **next-cicd.yml** - Main workflow that handles all aspects of the CI/CD pipeline
2. **workflow-monitoring.yml** - Monitors the health of workflows and deployed applications
3. **rollback.yml** - Provides rollback capability for deployments

### Triggers

The workflow is triggered by:
- **Push** to `main`, `master`, or `develop` branches
- **Pull Requests** to `main`, `master`, or `develop` branches
- **Manual Trigger** (workflow_dispatch) with an option to deploy to production

### Jobs and Flow

The pipeline follows this flow:

1. **Quality Checks**
   - Runs ESLint for code quality checks
   - Executes Jest tests (skipping tests in the /pages directory)
   - Performs security scanning with npm audit and Snyk
   - Runs CodeQL analysis for security vulnerabilities

2. **Build Process**
   - Builds the Next.js application
   - Runs performance testing with Lighthouse
   - Creates and uploads build artifacts

3. **Deployment**
   - For the `develop` branch: Creates a preview deployment
   - For pull requests to `main`/`master` or manual triggers: Creates a production deployment
   - Performs health checks on deployments
   - Stores deployment URLs for potential rollbacks

4. **Synthetic Monitoring**
   - Runs k6 tests against deployed environments
   - Monitors critical user journeys
   - Reports any failures

## Benefits of Modular Structure

This modular approach provides several benefits:

1. **Expandability** - New stages can be added without modifying existing workflows
2. **Maintainability** - Each workflow file focuses on a specific part of the pipeline
3. **Reusability** - Workflows can be reused in different contexts
4. **Clarity** - The pipeline flow is clearly defined in the main orchestrator

## Environment Variables and Secrets

The pipeline requires the following secrets to be configured in your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `GH_PAT`: GitHub Personal Access Token with appropriate permissions
- `NEXT_PUBLIC_CONVEX_URL`: Convex URL for your application
- `NEXT_PUBLIC_GEMINI_API_KEY`: Google Gemini API key
- `NEXT_PUBLIC_GOOGLE_AUTH_KEY`: Google Auth key
- `SNYK_TOKEN`: (Optional) Snyk API token for security scanning

## Deployment Strategy

The workflow implements a progressive deployment strategy:

1. **Develop Branch**: Automatically creates a preview deployment for testing changes
2. **Pull Request to Main**: Automatically deploys to production when PR is created
3. **Manual Trigger**: Manually trigger the workflow with the "deploy_to_production" option to deploy to production

## Monitoring and Rollbacks

- **Synthetic Monitoring**: Automated k6 tests run against all deployments
- **Health Checks**: Automated health checks verify deployments are working
- **Rollback Capability**: The rollback.yml workflow can revert to previous deployments if issues are detected
- **Artifact Retention**: Deployment URLs are stored as artifacts for future reference
