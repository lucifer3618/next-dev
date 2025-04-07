"use client"

import { React, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessagesContext } from "../context/MessagesContext"
import { UserContext } from "@/context/UserContext"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { ActionContext } from "@/context/ActionContext"


export function ThemeProvider({ children, }) {
    const [messages, setMessages] = useState();
    const [userData, setUserData] = useState();
    const [action, setAction] = useState();
    const convex = useConvex();

    useEffect(() => {
        isAuthenticated();
    }, [])

    async function isAuthenticated() {
        if (typeof window != undefined) {
            const user = JSON.parse(localStorage.getItem('user'));

            if (user == null) {
                return;
            }

            // Fetch from database
            const result = await convex.query(api.users.GetUser, {
                email: user?.email
            });
            setUserData(result);
        }
    }

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY}>
            <UserContext.Provider value={{ userData, setUserData }}>
                <MessagesContext.Provider value={{ messages, setMessages }}>
                    <ActionContext.Provider value={{ action, setAction }}>
                        <NextThemesProvider
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange>
                            <SidebarProvider>
                                <AppSidebar />
                                <SidebarInset>
                                    {children}
                                    <Toaster />
                                </SidebarInset>
                            </SidebarProvider>
                        </NextThemesProvider>
                    </ActionContext.Provider>
                </MessagesContext.Provider>
            </UserContext.Provider>
        </GoogleOAuthProvider>
    )
}
