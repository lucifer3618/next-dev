"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState, useEffect } from "react";

// Initialize the client on the client side only
export function ConvexClientProvider({ children }) {
    const [convexClient, setConvexClient] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only initialize the client in the browser
        try {
            const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
            console.log("Initializing Convex client with URL:", convexUrl);

            if (!convexUrl) {
                throw new Error("Convex URL is not defined");
            }

            const client = new ConvexReactClient(convexUrl);
            setConvexClient(client);
            setIsLoading(false);
        } catch (err) {
            console.error("Error initializing Convex client:", err);
            setError(err.message);
            setIsLoading(false);
        }
    }, []);

    // Show a loading state when initializing
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-xl font-semibold mb-4">Loading application...</div>
                <div className="text-sm text-gray-500">Connecting to database</div>
            </div>
        );
    }

    // Show error state if there was a problem
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
                <div className="text-xl font-semibold mb-4">Error connecting to database</div>
                <div className="text-sm">{error}</div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    // If client is initialized, render the app
    if (convexClient) {
        return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
    }

    // Fallback for unexpected state
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl font-semibold">Unable to initialize application</div>
        </div>
    );
}
