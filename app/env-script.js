"use client";

import { useEffect } from "react";
import { GOOGLE_AUTH_KEY, CONVEX_URL, GEMINI_API_KEY } from "./env-config";

export function EnvScript() {
  useEffect(() => {
    // Make environment variables available globally
    window.ENV = {
      NEXT_PUBLIC_CONVEX_URL: CONVEX_URL,
      NEXT_PUBLIC_GEMINI_API_KEY: GEMINI_API_KEY,
      NEXT_PUBLIC_GOOGLE_AUTH_KEY: GOOGLE_AUTH_KEY,
    };
    
    // Also set the individual ENV_ variables for backward compatibility
    window.ENV_CONVEX_URL = CONVEX_URL;
    window.ENV_GEMINI_API_KEY = GEMINI_API_KEY;
    window.ENV_GOOGLE_AUTH_KEY = GOOGLE_AUTH_KEY;
    
    console.log("Environment variables loaded:", {
      convexUrl: window.ENV.NEXT_PUBLIC_CONVEX_URL,
      googleAuthKey: window.ENV.NEXT_PUBLIC_GOOGLE_AUTH_KEY ? "Set" : "Not set",
    });
    
    // Log the Google Auth Key specifically for debugging
    console.log("Google Auth Key in EnvScript:", GOOGLE_AUTH_KEY || "Not set");
  }, []);

  return null;
}
