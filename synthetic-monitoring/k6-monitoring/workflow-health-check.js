import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
export const failRate = new Rate('failed_checks');
export const apiResponseTime = new Trend('api_response_time');
export const workflowCheckTime = new Trend('workflow_check_time');
export const deploymentCheckTime = new Trend('deployment_check_time');

// Configuration
const GITHUB_TOKEN = __ENV.GITHUB_TOKEN || '';
const VERCEL_TOKEN = __ENV.VERCEL_TOKEN || '';
const REPO = __ENV.REPO || 'owner/repo'; // Format: owner/repo
const APP_URL = __ENV.APP_URL || 'https://next-dev-pi.vercel.app';

export const options = {
  thresholds: {
    'failed_checks': ['rate<0.1'], // Less than 10% of checks should fail
    'http_req_duration': ['p(95)<5000'], // 95% of requests should be below 5s
    'api_response_time': ['p(95)<3000'], // 95% of API responses should be below 3s
    'workflow_check_time': ['p(95)<2000'], // 95% of workflow checks should be below 2s
  },
  noConnectionReuse: true,
  insecureSkipTLSVerify: true,
  // Run for 1 minute by default
  duration: '1m',
};

export default function() {
  // Check GitHub Actions API for workflows
  console.log('Checking GitHub Actions workflows...');
  const startWorkflowCheck = new Date();
  
  const workflowsResponse = http.get(`https://api.github.com/repos/${REPO}/actions/workflows`, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'User-Agent': 'k6-synthetic-monitoring',
    },
  });
  
  workflowCheckTime.add(new Date() - startWorkflowCheck);
  apiResponseTime.add(workflowsResponse.timings.duration);
  
  // Check if GitHub Actions API is responding
  const workflowsCheck = check(workflowsResponse, {
    'GitHub Actions API is up': (r) => r.status === 200,
    'GitHub Actions API returns workflows': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.workflows && body.workflows.length > 0;
      } catch (e) {
        console.error('Failed to parse GitHub API response:', e);
        return false;
      }
    },
  });
  
  failRate.add(!workflowsCheck);
  
  // If we got workflows, check their status
  if (workflowsResponse.status === 200) {
    try {
      const workflows = JSON.parse(workflowsResponse.body).workflows;
      
      // Check the status of each workflow
      for (const workflow of workflows.slice(0, 5)) { // Check up to 5 workflows to avoid rate limits
        console.log(`Checking workflow: ${workflow.name} (${workflow.id})`);
        
        const workflowRunsResponse = http.get(`https://api.github.com/repos/${REPO}/actions/workflows/${workflow.id}/runs?per_page=1`, {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'User-Agent': 'k6-synthetic-monitoring',
          },
        });
        
        apiResponseTime.add(workflowRunsResponse.timings.duration);
        
        check(workflowRunsResponse, {
          [`Workflow ${workflow.name} API response is valid`]: (r) => r.status === 200,
          [`Workflow ${workflow.name} has runs`]: (r) => {
            try {
              const body = JSON.parse(r.body);
              return body.workflow_runs && body.workflow_runs.length > 0;
            } catch (e) {
              console.error(`Failed to parse workflow runs for ${workflow.name}:`, e);
              return false;
            }
          },
        });
        
        // Small pause to avoid rate limiting
        sleep(0.5);
      }
    } catch (e) {
      console.error('Error processing workflows:', e);
      failRate.add(1);
    }
  }
  
  // Check Vercel deployments
  console.log('Checking Vercel deployments...');
  const startDeploymentCheck = new Date();
  
  const deploymentsResponse = http.get('https://api.vercel.com/v6/deployments', {
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
    },
  });
  
  deploymentCheckTime.add(new Date() - startDeploymentCheck);
  apiResponseTime.add(deploymentsResponse.timings.duration);
  
  // Check if Vercel API is responding
  const vercelCheck = check(deploymentsResponse, {
    'Vercel API is accessible': (r) => r.status === 200 || r.status === 401 || r.status === 403,
    'Vercel API response time is acceptable': (r) => r.timings.duration < 2000,
  });
  
  failRate.add(!vercelCheck);
  
  // Check application health
  console.log(`Checking application health at ${APP_URL}...`);
  const appResponse = http.get(APP_URL);
  
  apiResponseTime.add(appResponse.timings.duration);
  
  // Check if application is responding
  const appCheck = check(appResponse, {
    'Application is up': (r) => r.status === 200,
    'Application loads in reasonable time': (r) => r.timings.duration < 5000,
    'Application returns HTML': (r) => r.body.includes('<!DOCTYPE html>') || r.body.includes('<html'),
  });
  
  failRate.add(!appCheck);
  
  // Check specific application routes if needed
  const routes = [
    '/',
    '/workspace',
    '/api/health', // If you have a health endpoint
  ];
  
  for (const route of routes) {
    const routeUrl = `${APP_URL}${route}`;
    console.log(`Checking route: ${routeUrl}`);
    
    const routeResponse = http.get(routeUrl);
    
    apiResponseTime.add(routeResponse.timings.duration);
    
    check(routeResponse, {
      [`Route ${route} is accessible`]: (r) => r.status !== 0,
      [`Route ${route} returns valid status`]: (r) => {
        // For API routes, 200-299 is success, for pages 200 is expected
        if (route.startsWith('/api')) {
          return r.status >= 200 && r.status < 300;
        }
        return r.status === 200;
      },
    });
    
    // Small pause between route checks
    sleep(0.5);
  }
  
  // Pause between iterations
  sleep(1);
}
