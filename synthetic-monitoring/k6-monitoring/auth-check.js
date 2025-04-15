import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const failureRate = new Rate('auth_check_failure_rate');
const authLoadTime = new Trend('auth_page_load_time');

// Default options
export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    'auth_check_failure_rate': ['rate<0.05'], // Allow up to 5% failure rate
    'auth_page_load_time': ['p(95)<1500'], // Auth page should load quickly
    'http_req_duration{name:auth}': ['p(95)<1000'],
  }
};

// Main function
export default function() {
  // Get the base URL from environment variable or use default
  const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

  // Check if login page or component is accessible
  // This is a non-destructive test that doesn't attempt actual login
  const loginResponse = http.get(`${baseUrl}`, {
    tags: { name: 'auth', critical: true }
  });

  // Track auth page load time
  authLoadTime.add(loginResponse.timings.duration);

  // Check if the login page loaded successfully
  const loginChecks = check(loginResponse, {
    'login page status is 200': (r) => r.status === 200,
    'login page has login elements': (r) => {
      // More flexible check for login-related elements
      // Convert to lowercase for case-insensitive matching
      const bodyLower = r.body.toLowerCase();

      // Check for common authentication-related terms
      const hasAuthElements = bodyLower.includes('login') ||
        bodyLower.includes('sign in') ||
        bodyLower.includes('signin') ||
        bodyLower.includes('log in') ||
        bodyLower.includes('account') ||
        bodyLower.includes('auth') ||
        bodyLower.includes('user') ||
        bodyLower.includes('profile') ||
        bodyLower.includes('google') ||
        bodyLower.includes('oauth');

      if (!hasAuthElements) {
        console.warn('No authentication elements found on the page. This might be expected if auth is handled differently.');
      }

      return hasAuthElements;
    },
    'login page has form or button elements': (r) => {
      const bodyLower = r.body.toLowerCase();
      return bodyLower.includes('button') ||
             bodyLower.includes('form') ||
             bodyLower.includes('input');
    }
  });

  // Track if any checks failed
  failureRate.add(!loginChecks);

  // Try to find login-specific paths
  const authPaths = [
    '/login',
    '/signin',
    '/auth',
    '/account',
    '/profile'
  ];

  // Check each potential auth path
  for (const path of authPaths) {
    const authPathResponse = http.get(`${baseUrl}${path}`, {
      tags: { name: 'auth-path' }
    });

    // If we found a valid auth page, check it
    if (authPathResponse.status === 200) {
      console.log(`Found potential auth page at ${path}`);

      check(authPathResponse, {
        [`${path} has auth elements`]: (r) => {
          const bodyLower = r.body.toLowerCase();
          return bodyLower.includes('login') ||
                 bodyLower.includes('sign') ||
                 bodyLower.includes('auth') ||
                 bodyLower.includes('user');
        },
        [`${path} has interactive elements`]: (r) => {
          const bodyLower = r.body.toLowerCase();
          return bodyLower.includes('button') ||
                 bodyLower.includes('form') ||
                 bodyLower.includes('input');
        }
      });

      // We found one auth page, no need to check others
      break;
    }

    // Small pause between auth path checks
    sleep(0.3);
  }

  // Small pause between checks
  sleep(1);
}
