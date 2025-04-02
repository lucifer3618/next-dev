"use client";

import { MessagesContext } from '@/context/MessagesContext';
import { UserContext } from '@/context/UserContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup';
import { useConvex, useMutation } from 'convex/react';
import { ArrowUp, Link } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import uuid4 from 'uuid4';
import { useTheme } from 'next-themes';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import { Skeleton } from '../ui/skeleton';
import Markdown from 'react-markdown'
import { toast } from 'sonner';

export const countTokens = (sentence) => {
    return sentence.trim().split(/\s+/).length;
}


function ChatComponent() {
    const { id } = useParams();
    const convex = useConvex();
    const { userData, setUserData } = useContext(UserContext);
    const { messages = [], setMessages } = useContext(MessagesContext);
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState();
    const { theme, setTheme } = useTheme();
    const [cardBG, setCardBG] = useState(Colors.CHAT_BACKGROUND);
    const UpdateMessages = useMutation(api.workspace.UpdateMessages);
    const UpdateTokens = useMutation(api.users.UpdateTokens);


    useEffect(() => {
        if (id) {
            GetWorkSpaceData();
        }
    }, [id]);

    useEffect(() => {
        setCardBG(theme == "dark" ? Colors.CHAT_BACKGROUND : "#edf5f3")
    }, [theme])

    const GetWorkSpaceData = async () => {
        try {
            const result = await convex.query(api.workspace.GetWorkspace, {
                workspaceId: id,
            });
            setMessages(result.messages || []); // Ensure default to an array if no messages
        } catch (error) {
            console.error("Error fetching workspace data:", error);
            setMessages([]); // Default to an empty array on error
        }
    };


    useEffect(() => {
        if (messages.length > 0) {
            const role = messages[messages?.length - 1].role;
            if (role == "user") {
                GetAIResponse();
            }
        }
    }, [messages])

    async function GetAIResponse() {
        setLoading(true);

        if (userData?.token > 0 && userData?.token != NaN) {
            const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
            const result = await axios.post('/api/ai-chat', {
                prompt: PROMPT
            });

            const aiResponse = {
                id: uuid4(),
                role: "ai",
                content: result.data.result,
            };

            setMessages(prev => [...prev, aiResponse])

            await UpdateMessages({
                workspaceId: id,
                messages: [...messages, aiResponse]
            })

            const usedTokens = countTokens(JSON.stringify(aiResponse));
            console.log(`LEN: ${usedTokens}`);

            const remainingTokens = Number(userData?.token) - Number(usedTokens);
            await UpdateTokens({
                userId: userData?._id,
                token: remainingTokens,
            })
        } else {
            toast.error("Error generating prompt!", {
                description: "Not engough tokens avilable!. Please buy more to continue.",
                action: {
                    label: "Ok",
                    onClick: () => console.log("ok"),
                },
            })
        }

        setLoading(false);
    }

    function onGenerate(input) {
        setMessages(prev => [...prev, {
            id: uuid4(),
            role: 'user',
            content: input,
        }]);
        setUserInput("");
    }


    return (
        <div className='h-[85vh] flex flex-col justify-between'>
            <div className='felx-1 overflow-y-scroll scrollbar-hide'>
                <div>
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg.id} className='p-3 rounded-lg mb-2 flex items-start gap-2 leading-7' style={{ backgroundColor: cardBG }}>
                                {msg.role == "user" && <img src={userData?.picture} width={35} height={35} className='rounded-full' alt='profile-img' />}
                                <div className='flex flex-col'>
                                    <Markdown>{msg.content}</Markdown>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No messages available.</p> // Placeholder for no messages
                    )}
                </div>
                {loading &&
                    (
                        <div className="flex items-center justify-end space-x-4">
                            <div className="flex flex-col items-end space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="p-3 border border-gray-700 rounded-xl w-full mt-5 backdrop-blur-lg bg-white/10">
                <div className="">
                    <textarea
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        className="outline-none bg-transparent w-full h-20 max-h-56 resize-none "
                        placeholder={Lookup.INPUT_PLACEHOLDER}
                    />
                </div>
                <div className='flex justify-between items-end'>
                    <Link className="h-5 w-5" />
                    <ArrowUp

                        onClick={() => onGenerate(userInput)}
                        style={{ backgroundColor: Colors.MAIN }}
                        className={`p-2 h-9 w-9 rounded-md cursor-pointer ${userInput == "" ? "invisible opacity-0" : "visible opacity-100"
                            } transition-all delay-75 ease-in-out`}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;
