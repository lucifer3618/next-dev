"use client";

// This file provides a consistent way to access environment variables
// across different environments (development, production, etc.)

// Get environment variables with fallbacks
export const getEnvVariable = (key, defaultValue = "") => {
  // For client-side code
  if (typeof window !== "undefined") {
    // Try to get from window.ENV first (set by env-script.js)
    if (window.ENV && window.ENV[key]) {
      return window.ENV[key];
    }
    
    // Try to get from window.ENV_* variables (set by inline script in layout.jsx)
    const windowKey = `ENV_${key.replace("NEXT_PUBLIC_", "")}`;
    if (window[windowKey]) {
      return window[windowKey];
    }
    
    // Try to get from process.env
    if (process.env[key]) {
      return process.env[key];
    }
    
    // Return hardcoded values for specific keys as a last resort
    if (key === "NEXT_PUBLIC_GOOGLE_AUTH_KEY") {
      return "615788238668-itemrc5tekosnnheknkd9h5qdgdbebpf.apps.googleusercontent.com";
    }
    
    return defaultValue;
  }
  
  // For server-side code
  return process.env[key] || defaultValue;
};

// Export specific environment variables
export const GOOGLE_AUTH_KEY = getEnvVariable("NEXT_PUBLIC_GOOGLE_AUTH_KEY");
export const CONVEX_URL = getEnvVariable("NEXT_PUBLIC_CONVEX_URL");
export const GEMINI_API_KEY = getEnvVariable("NEXT_PUBLIC_GEMINI_API_KEY");
