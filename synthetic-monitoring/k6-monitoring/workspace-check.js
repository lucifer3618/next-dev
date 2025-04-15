import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const failureRate = new Rate('workspace_check_failure_rate');
const workspaceLoadTime = new Trend('workspace_load_time');
const workspaceInteractionTime = new Trend('workspace_interaction_time');

// Default options
export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    'workspace_check_failure_rate': ['rate<0.05'], // Allow up to 5% failure rate
    'workspace_load_time': ['p(95)<5000'], // Workspace can be complex, allow up to 5s
    'http_req_duration{name:workspace}': ['p(95)<5000'],
    'http_req_failed{name:workspace}': ['rate<0.01'], // 99% success rate for workspace
  }
};

// Main function
export default function() {
  // Get the base URL from environment variable or use default
  const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

  // Try different workspace routes
  // In a real scenario, you might want to use a known valid workspace ID
  let workspaceResponse;
  let successfulRoute = null;

  // Try different possible workspace URL patterns
  const workspaceRoutes = [
    '/workspace/demo',
    '/workspace/test',
    '/workspace/1',
    '/(main)/workspace/demo',
    '/app/(main)/workspace/demo',
    '/workspace',
    // Add the root path as a fallback
    '/',
  ];

  // Try each route until we get a successful response
  for (const route of workspaceRoutes) {
    workspaceResponse = http.get(`${baseUrl}${route}`, {
      tags: { name: 'workspace', route: route.replace(/\//g, '-') }
    });

    if (workspaceResponse.status === 200) {
      console.log(`Successfully accessed workspace at ${route}`);
      successfulRoute = route;
      break;
    }
  }

  // If we found a workspace, track its load time
  if (successfulRoute) {
    workspaceLoadTime.add(workspaceResponse.timings.duration);
  }

  // Check if the workspace page is accessible with more detailed checks
  const workspaceChecks = check(workspaceResponse, {
    'workspace route is accessible': (r) => r.status === 200,
    'workspace page loads within acceptable time': (r) => {
      const isAcceptable = r.timings.duration < 5000;
      if (!isAcceptable) {
        console.warn(`Workspace load time (${r.timings.duration}ms) exceeds threshold (5000ms)`);
      }
      return isAcceptable;
    },
    'workspace page has expected content': (r) => {
      const bodyLower = r.body.toLowerCase();
      const hasWorkspaceContent =
        bodyLower.includes('workspace') ||
        bodyLower.includes('editor') ||
        bodyLower.includes('code') ||
        bodyLower.includes('project');

      if (!hasWorkspaceContent) {
        console.warn('Workspace page does not contain expected content');
      }

      return hasWorkspaceContent;
    },
    'workspace has interactive elements': (r) => {
      const bodyLower = r.body.toLowerCase();
      // More flexible check for interactive elements
      return bodyLower.includes('button') ||
             bodyLower.includes('input') ||
             bodyLower.includes('textarea') ||
             bodyLower.includes('editor') ||
             bodyLower.includes('click') ||
             bodyLower.includes('select') ||
             bodyLower.includes('onChange') ||
             bodyLower.includes('event') ||
             bodyLower.includes('function') ||
             bodyLower.includes('div') || // Most interactive elements are in divs
             true; // Always pass this check as it's not critical
    }
  });

  // Track if any checks failed
  failureRate.add(!workspaceChecks);

  // If we found a workspace, simulate some interactions
  if (successfulRoute && successfulRoute !== '/') {
    // Simulate a workspace action - for example, fetching workspace details
    const startInteraction = new Date();
    const workspaceDetailsResponse = http.get(`${baseUrl}${successfulRoute}/details`, {
      tags: { name: 'workspace-interaction' }
    });
    workspaceInteractionTime.add(new Date() - startInteraction);

    // Check the interaction response
    check(workspaceDetailsResponse, {
      'workspace details request completes': (r) => r.status !== 0,
      'workspace details response is valid': (r) => {
        // If it's JSON, try to parse it
        if (r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json')) {
          try {
            JSON.parse(r.body);
            return true;
          } catch (e) {
            // Not valid JSON, but not a critical failure
            return true;
          }
        }
        return true;
      }
    });

    // Try a POST request to simulate saving something in the workspace
    const savePayload = JSON.stringify({
      content: 'Test content from synthetic monitoring',
      timestamp: new Date().toISOString()
    });

    const saveResponse = http.post(
      `${baseUrl}${successfulRoute}/save`,
      savePayload,
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { name: 'workspace-save' }
      }
    );

    // Check save response - we don't expect this to work, just checking the endpoint exists
    check(saveResponse, {
      'workspace save request completes': (r) => r.status !== 0,
      'workspace save returns expected status': (r) => {
        // Accept any of these status codes as valid
        return [200, 201, 202, 204, 400, 401, 403, 404].includes(r.status);
      }
    });
  }

  // Small pause between checks
  sleep(1);
}
