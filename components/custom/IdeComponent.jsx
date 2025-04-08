'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useTheme } from 'next-themes';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useParams } from 'next/navigation';
import { motion } from "framer-motion";
import { Code, Download, EyeIcon, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import Lookup from '@/data/Lookup';
import axios from 'axios';
import { MessagesContext } from '@/context/MessagesContext';
import Prompt from '@/data/Prompt';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Loading from './Loading';
import { countTokens } from './ChatComponent';
import { UserContext } from '@/context/UserContext';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import SandpackPreviewWindow from './SandpackPreviewWindow';
import { ActionContext } from '@/context/ActionContext';


function IdeComponent() {
    const { theme, setTheme } = useTheme();
    const { id } = useParams();
    const [mounted, setMounted] = useState(false);
    const [activeView, setActiveView] = useState("code");
    const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
    const { messages = [], setMessages } = useContext(MessagesContext);
    const UpdateFiles = useMutation(api.workspace.UpdateFiles);
    const convex = useConvex();
    const [loading, setLoading] = useState(true);
    const UpdateTokens = useMutation(api.users.UpdateTokens);
    const { userData, setUserData } = useContext(UserContext);
    const { action, setAction } = useContext(ActionContext);


    useEffect(() => {
        GetFiles();
    }, [id]);

    async function GetFiles() {
        setLoading(true);
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id,
        });
        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result.fileData };
        setFiles(mergedFiles);
        setLoading(false);
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            const role = messages[messages?.length - 1].role;
            if (role == "user") {
                GenerateAiCode();
            }
        }
    }, [messages])

    const handleToggle = (view) => {
        setActiveView(view);
    };

    async function GenerateAiCode() {
        setLoading(true);
        if (userData?.token > 0 && userData.token != NaN) {
            console.log(userData.token);
            const PROMPT = JSON.stringify(messages) + Prompt.CODE_GEN_PROMPT;
            const result = await axios.post('/api/gen-ai-code', { prompt: PROMPT });
            const aiResponse = result.data;
            const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResponse.files };
            setFiles(mergedFiles);
            console.log(aiResponse);
            console.log(aiResponse.files);
            await UpdateFiles({
                workspaceId: id,
                files: aiResponse.files,
            });

            const usedTokens = countTokens(JSON.stringify(aiResponse));
            console.log(`LEN CODE: ${usedTokens}`);

            const remainingTokens = Number(userData?.token) - Number(usedTokens);
            await UpdateTokens({
                userId: userData?._id,
                token: remainingTokens,
            })
            setUserData({
                ...userData, token: remainingTokens,
            });
        }

        setLoading(false);
    }

    function onActionButton(action) {
        setAction({
            actionType: action,
            timeStamp: Date.now(),
        })
    }

    if (!mounted) return null; // Prevents hydration mismatch

    return (
        <div className=''>
            <div className='flex justify-between items-center'>
                <div className='pb-3 flex-1'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Chats</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className="truncate">
                                <BreadcrumbPage>{id}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {activeView == "preview" &&
                    <div className='hidden mx-5 mb-2 lg:flex justify-between items-center gap-3'>
                        <Button variant='outline' onClick={() => onActionButton('export')} className='rounded-full h-10'><Download /> Export</Button>
                        <Button onClick={() => onActionButton('deploy')} className='rounded-full active:bg-[#009d70] dark:active:text-white'><Rocket /> Deploy</Button>
                    </div>
                }
                <div className='mb-2'>
                    <div className="flex p-1 bg-secondary/80 backdrop-blur-sm rounded-full border border-border/50 shadow-sm w-fit">
                        <div className="relative flex">
                            <motion.div
                                className="absolute bg-[#009d70] rounded-full shadow-sm h-full w-1/2 z-0"
                                animate={{ x: activeView === "code" ? 0 : "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => handleToggle("code")}
                                className={cn("relative z-10 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors",
                                    activeView === "code"
                                        ? "text-white dark:text-slate-200"
                                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
                            >
                                <Code size={16} />
                                <span>Code</span>
                            </button>
                            <button
                                onClick={() => handleToggle("preview")}
                                className={cn("relative z-10 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors",
                                    activeView === "preview"
                                        ? "text-white dark:text-slate-200"
                                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
                            >
                                <EyeIcon size={16} />
                                <span>Preview</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative'>

                {loading && <Loading />}

                <SandpackProvider template="react" files={files} theme={theme}
                    options={{
                        externalResources: ['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'],
                        visibleFiles: ["/App.js"], // Set the initial open file
                        activeFile: "/App.js",
                    }}
                    customSetup={{
                        dependencies: { ...Lookup.DEPENDANCY },
                        entry: "/index.js",
                    }}
                >
                    <SandpackLayout>
                        {activeView === "code" ? (
                            <>
                                <SandpackFileExplorer style={{ height: '79vh' }} />
                                <SandpackCodeEditor wrapContent={true} style={{ height: '79vh', overflow: 'auto', whiteSpace: 'pre-wrap' }} />
                            </>
                        ) : (
                            <SandpackPreviewWindow />
                        )}
                    </SandpackLayout>
                </SandpackProvider>
            </div>
        </div>
    );
}

export default IdeComponent;
