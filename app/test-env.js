"use client";

import { useEffect } from "react";
import { GOOGLE_AUTH_KEY } from "./env-config";

export function TestEnv() {
  useEffect(() => {
    console.log("Environment variables check:");
    console.log("- process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY:", process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY ? "Set" : "Not set");
    console.log("- window.ENV_GOOGLE_AUTH_KEY:", typeof window !== 'undefined' && window.ENV_GOOGLE_AUTH_KEY ? "Set" : "Not set");
    console.log("- window.ENV?.NEXT_PUBLIC_GOOGLE_AUTH_KEY:", typeof window !== 'undefined' && window.ENV?.NEXT_PUBLIC_GOOGLE_AUTH_KEY ? "Set" : "Not set");
    console.log("- GOOGLE_AUTH_KEY from env-config:", GOOGLE_AUTH_KEY ? "Set" : "Not set");
    
    // Display the actual value for debugging
    if (GOOGLE_AUTH_KEY) {
      console.log("Google Auth Key value:", GOOGLE_AUTH_KEY);
    }
  }, []);

  return null;
}
