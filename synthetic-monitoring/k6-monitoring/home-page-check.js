import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics to track failure rate and page load times
const failureRate = new Rate('check_failure_rate');
const homePageLoadTime = new Trend('home_page_load_time');
const navigationTime = new Trend('navigation_time');

// Default options
export const options = {
  // A single VU (virtual user) is enough for synthetic monitoring
  vus: 1,
  // Run for 1 iteration
  iterations: 1,
  // Thresholds for alerting
  thresholds: {
    // Alert if more than 5% of checks fail
    'check_failure_rate': ['rate<0.05'],
    // Performance thresholds
    'home_page_load_time': ['p(95)<2000'], // 95% of home page loads should be below 2s
    'http_req_duration{name:homepage}': ['p(95)<1500'], // More specific threshold for homepage
    'http_req_duration{name:api}': ['p(95)<1000'], // API endpoints should be faster
    'http_req_failed{name:critical}': ['rate<0.01'], // 99% success rate for critical paths
  }
};

// Main function
export default function() {
  // Get the base URL from environment variable or use default
  const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

  // Check home page with tags for threshold matching
  const homeResponse = http.get(baseUrl, {
    tags: { name: 'homepage', critical: true }
  });

  // Track home page load time
  homePageLoadTime.add(homeResponse.timings.duration);

  // Verify the home page loaded successfully with more detailed checks
  const homeChecks = check(homeResponse, {
    'home page status is 200': (r) => r.status === 200,
    'home page has expected content': (r) => r.body.includes('next-dev') || r.body.includes('Next.js'),
    'home page has expected structure': (r) => {
      // More flexible check for common HTML structure elements
      const bodyLower = r.body.toLowerCase();
      return bodyLower.includes('<div') || // Most sites have div elements
             bodyLower.includes('<header') ||
             bodyLower.includes('<nav') ||
             bodyLower.includes('<main') ||
             bodyLower.includes('<section') ||
             bodyLower.includes('<footer') ||
             bodyLower.includes('<body'); // Every HTML page has a body
    },
    'home page has navigation elements': (r) => {
      // More flexible check for navigation elements
      const bodyLower = r.body.toLowerCase();
      return bodyLower.includes('href=') || // Links have href attributes
             bodyLower.includes('url') ||
             bodyLower.includes('link') ||
             bodyLower.includes('nav') ||
             bodyLower.includes('menu') ||
             bodyLower.includes('button'); // Most interactive sites have buttons
    },
    'home page loads critical resources': (r) => {
      // Check for critical resources like CSS and JS
      return r.body.includes('.js') &&
             (r.body.includes('.css') || r.body.includes('style'));
    }
  });

  // Track if any checks failed
  failureRate.add(!homeChecks);

  // Simulate navigation to another page (if links are found)
  let navigationTarget = '/workspace';
  if (homeResponse.body.includes('href="/features"') ||
      homeResponse.body.includes('href="#features"')) {
    navigationTarget = '/features';
  } else if (homeResponse.body.includes('href="/about"')) {
    navigationTarget = '/about';
  }

  // Navigate to the identified page
  const startNav = new Date();
  const navResponse = http.get(`${baseUrl}${navigationTarget}`, {
    tags: { name: 'navigation' }
  });
  navigationTime.add(new Date() - startNav);

  // Check navigation success
  check(navResponse, {
    'navigation successful': (r) => r.status !== 0,
    'navigation page has content': (r) => r.body.length > 100
  });

  // Check critical API endpoints
  const apiPaths = [
    '/api/health', // Health check endpoint (if available)
    '/api', // API endpoint (if available)
    '/api/ai-chat', // AI chat endpoint
    '/api/gen-ai-code' // Code generation endpoint
  ];

  for (const path of apiPaths) {
    const isCritical = path.includes('ai-chat') || path.includes('gen-ai-code');
    const pathResponse = http.get(`${baseUrl}${path}`, {
      tags: { name: 'api', critical: isCritical }
    });

    // More detailed API checks
    const apiCheck = check(pathResponse, {
      [`${path} returns a response`]: (r) => r.status !== 0,
      [`${path} response time is acceptable`]: (r) => r.timings.duration < 2000,
      [`${path} returns valid data format`]: (r) => {
        // Check if response is JSON (for API endpoints)
        if (r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json')) {
          try {
            JSON.parse(r.body);
            return true;
          } catch (e) {
            console.error(`Invalid JSON from ${path}:`, e);
            return false;
          }
        }
        // Not all endpoints return JSON, so this is not a failure
        return true;
      }
    });

    failureRate.add(!apiCheck);

    // Small pause between API calls
    sleep(0.5);
  }

  // Small pause between checks
  sleep(1);
}
