"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState, useEffect } from "react";

// Initialize the client on the client side only
export function ConvexClientProvider({ children }) {
    const [convexClient, setConvexClient] = useState(null);

    useEffect(() => {
        // Only initialize the client in the browser
        const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
        if (convexUrl) {
            const client = new ConvexReactClient(convexUrl);
            setConvexClient(client);
        }
    }, []);

    // Show a loading state or fallback when the client is not yet initialized
    if (!convexClient) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
