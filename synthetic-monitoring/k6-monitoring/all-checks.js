import { group, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import http from 'k6/http';

// Import individual test scripts
import homeCheck from './home-page-check.js';
import authCheck from './auth-check.js';
import apiCheck from './api-check.js';
import workspaceCheck from './workspace-check.js';

// Custom metrics to track overall performance and reliability
export const failureRate = new Rate('overall_check_failure_rate');
export const overallResponseTime = new Trend('overall_response_time');
export const criticalPathTime = new Trend('critical_path_time');

// Default options
export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    // Allow up to 10% of checks to fail without failing the test
    'overall_check_failure_rate': ['rate<0.1'],
    // Overall performance thresholds
    'overall_response_time': ['p(95)<3000'],
    'critical_path_time': ['p(95)<2000'],
    // Specific thresholds for tagged requests
    'http_req_duration{name:critical}': ['p(95)<2000'],
    'http_req_failed{name:critical}': ['rate<0.01'],
  }
};

// Main function
export default function() {
  // Get the base URL from environment variable or use default
  const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

  // First, do a quick health check of the application
  const startTime = new Date();
  const healthCheck = http.get(`${baseUrl}`, {
    tags: { name: 'health-check', critical: true }
  });
  const healthCheckTime = new Date() - startTime;

  // Track health check metrics
  overallResponseTime.add(healthCheckTime);
  criticalPathTime.add(healthCheckTime);

  // If the health check fails, log it but continue with other checks
  if (healthCheck.status !== 200) {
    console.error(`Health check failed with status ${healthCheck.status}. Some tests may fail.`);
  }

  // Run home page checks
  group('Home Page Checks', () => {
    try {
      console.log('\n--- Starting Home Page Checks ---');
      homeCheck();
      console.log('--- Completed Home Page Checks ---\n');
    } catch (error) {
      console.error('Error in Home Page Checks:', error);
      failureRate.add(1); // Record failure
      // Continue with other checks even if this one fails
    }
  });

  sleep(1);

  // Run authentication checks
  group('Authentication Checks', () => {
    try {
      console.log('\n--- Starting Authentication Checks ---');
      authCheck();
      console.log('--- Completed Authentication Checks ---\n');
    } catch (error) {
      console.error('Error in Authentication Checks:', error);
      failureRate.add(1); // Record failure
      // Continue with other checks even if this one fails
    }
  });

  sleep(1);

  // Run API checks
  group('API Checks', () => {
    try {
      console.log('\n--- Starting API Checks ---');
      apiCheck();
      console.log('--- Completed API Checks ---\n');
    } catch (error) {
      console.error('Error in API Checks:', error);
      failureRate.add(1); // Record failure
      // Continue with other checks even if this one fails
    }
  });

  sleep(1);

  // Run workspace checks
  group('Workspace Checks', () => {
    try {
      console.log('\n--- Starting Workspace Checks ---');
      workspaceCheck();
      console.log('--- Completed Workspace Checks ---\n');
    } catch (error) {
      console.error('Error in Workspace Checks:', error);
      failureRate.add(1); // Record failure
      // Continue with other checks even if this one fails
    }
  });

  // Final health check to ensure the application is still responsive
  const finalHealthCheck = http.get(`${baseUrl}`, {
    tags: { name: 'final-health-check' }
  });

  if (finalHealthCheck.status !== 200) {
    console.warn(`Final health check failed with status ${finalHealthCheck.status}. The application may be unstable.`);
    failureRate.add(1); // Record failure
  } else {
    console.log('\n--- All synthetic monitoring checks completed ---');
    console.log(`Final health check successful with status ${finalHealthCheck.status}`);
  }
}
