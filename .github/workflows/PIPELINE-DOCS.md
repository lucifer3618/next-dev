# Next.js CI/CD Pipeline Documentation

This document describes the improved Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Next-Dev project.

## Pipeline Overview

The CI/CD pipeline is implemented in a consolidated workflow file that handles all aspects of the development lifecycle, with additional workflows for monitoring and rollback capabilities.

### Workflow Files

1. **next-cicd.yml** - Main workflow that handles all aspects of the CI/CD pipeline
2. **workflow-monitoring.yml** - Monitors the health of workflows and deployed applications
3. **rollback.yml** - Provides rollback capability for deployments

### Triggers

The workflow is triggered by:
- **Push** to `main`, `master`, or `develop` branches
- **Pull Requests** to `main`, `master`, or `develop` branches
- **Manual Trigger** (workflow_dispatch) with an option to deploy to production

### Jobs and Stages

The pipeline consists of the following jobs:

1. **Lint and Test**
   - Runs ESLint for code quality checks
   - Executes Jest tests (skipping tests in the /pages directory as per preferences)
   - Generates test coverage reports
   - Uploads coverage reports as artifacts

2. **Security Scan**
   - Performs npm audit to check for vulnerable dependencies
   - Runs Snyk security scanning for deeper vulnerability detection
   - Continues pipeline even if non-critical vulnerabilities are found

3. **Build**
   - Builds the Next.js application with proper environment variables
   - Creates and uploads build artifacts for later deployment stages
   - Sets build status output for conditional downstream jobs

4. **Performance Testing**
   - Runs Lighthouse CI to test performance metrics
   - Provides insights on performance, accessibility, and best practices
   - Uploads Lighthouse reports as artifacts for review
   - Uses a custom configuration to prevent pipeline failures
   - Runs only if the build is successful

5. **Deploy Preview**
   - Deploys a preview version using Vercel
   - Runs automatically when changes are pushed to the develop branch
   - Performs health checks to ensure successful deployment
   - Stores deployment URL for potential rollback

6. **Deploy to Production**
   - Deploys to production environment using Vercel
   - Runs automatically when a pull request is created targeting the main/master branch
   - Can also be triggered manually through workflow dispatch
   - Performs health checks to ensure successful deployment
   - Stores production deployment URL for potential rollback

## Environment Variables and Secrets

The pipeline requires the following secrets to be configured in your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `NEXT_PUBLIC_CONVEX_URL`: Convex URL for your application
- `NEXT_PUBLIC_GEMINI_API_KEY`: Google Gemini API key
- `SNYK_TOKEN`: (Optional) Snyk API token for security scanning

## Deployment Strategy

The pipeline follows a specific deployment strategy:

- **Preview Deployment**: Automatically deployed when changes are pushed to the develop branch
- **Production Deployment**: Automatically deployed when a pull request is created targeting the main/master branch

This approach ensures that:
1. Development work gets a preview deployment for testing
2. Production deployments are triggered by pull requests to main/master
3. Tests are run in both scenarios before deployment

This strategy aligns with the project preference for automated deployments rather than manual approval steps.

## Rollback Capability

The pipeline stores deployment URLs as artifacts, which can be used with the existing rollback workflow if needed. The rollback process can be triggered manually using the `rollback.yml` workflow.

## Testing Approach

Following project preferences:
- Uses Jest for all test cases
- Focuses testing on custom components only (skips /pages directory)
- Ensures no skipped tests in the test suites

## Benefits of Consolidated Structure

This consolidated approach provides several benefits:

1. **Simplicity** - All CI/CD steps are defined in a single file, making it easier to understand the entire process
2. **Reliability** - No dependencies between separate workflow files that could cause reference issues
3. **Consistency** - All jobs use the same environment and configuration
4. **Clarity** - The pipeline flow is clearly defined in a single file

## Performance Considerations

- Uses caching for Node.js dependencies to speed up builds
- Implements parallel jobs where possible to reduce overall pipeline execution time
- Uses build artifacts to avoid rebuilding the application in later stages

## Future Improvements

Potential future enhancements to the pipeline:
- Add visual regression testing
- Implement A/B testing capabilities
- Add automated database migrations
- Implement canary deployments for safer production releases
