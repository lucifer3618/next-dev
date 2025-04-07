"use client"

import { MessagesContext } from '@/context/MessagesContext';
import { UserContext } from '@/context/UserContext';
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup'
import { ArrowUp, ChevronRight, Command, Link } from 'lucide-react'
import { useTheme } from 'next-themes';
import React, { useContext, useEffect, useRef, useState } from 'react'
import LoginDialog from './LoginDialog';
import Header from './Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import uuid4 from 'uuid4';
import { toast } from 'sonner';

function Hero() {
    const [userInput, setUserInput] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const { messages, setMessages } = useContext(MessagesContext);
    const { userData, setUserData } = useContext(UserContext);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [src, setSrc] = useState("bg-dark.mp4");
    const [pillBacgroudColor, setPillBackgroundColor] = useState("bg-white/10");
    const [brightness, setBrightness] = useState("brightness-50");
    const [blur, setBlur] = useState("absolute inset-0 bg-black/30 backdrop-blur-md");
    const videoRef = useRef(null);

    useEffect(() => {
        setSrc(theme === "dark" ? "bg-dark.mp4" : "bg-light.mp4");
        setPillBackgroundColor(theme === "dark" ? "backdrop-blur-lg bg-white/10" : "bg-gray-200 backdrop-blur-sm")
        setBrightness(theme === "dark" ? "brightness-50" : "brightness-100")
        setBlur(theme === "dark" ? "absolute inset-0 bg-black/30 backdrop-blur-md" : '')
    }, [theme]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();  // Forces the video element to reload the source
        }
    }, [router]);


    const reloadPage = () => {
        window.location.reload();
    };


    async function onGenerate(input) {
        if (!userData) {
            setOpenDialog(true);
            return;
        }
        setMessages({
            role: 'user',
            content: input,
        });

        if (userData?.token > 0) {
            const workspaceId = await CreateWorkspace({
                user: userData._id,
                messages: [{
                    id: uuid4(),
                    role: 'user',
                    content: input,
                }]
            });

            console.log(workspaceId);
            router.push('/workspace/' + workspaceId);
        } else {
            setTimeout(() => {
                toast.error("Error generating prompt!", {
                    description: "Not engough tokens avilable!. Please buy more to continue.",
                    action: {
                        label: "Ok",
                        onClick: () => console.log("ok"),
                    },
                })
            }, 3000);
        }
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* 🎥 Background Video */}
            <video
                id='background-video'
                ref={videoRef}
                type="video/mp4"
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover "
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>



            {/* 🌫️ Blur Effect Overlay */}
            <div className={blur}></div>

            <Header />
            {/* 📌 Main Content */}

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center h-[80vh]">
                <div className={`flex flex-row gap-2 mb-13 rounded-full px-4 py-2 ${pillBacgroudColor}`}>
                    <img src="/ai-icon.png" className='w-6' alt="" />
                    <h2 className='text-[17px]'>AI-Powered Development</h2>
                </div>
                <h2 className="font-bold text-4xl lg:text-6xl my-3 text-center  max-w-2xl">What would you <span className='text-transparent bg-clip-text bg-gradient-to-tr from-green-400 to-blue-400'>like to create?</span></h2>
                <p className="text-gray-400 mt-2 mx-2 font-medium max-w-2xl overflow-clip text-center italic">"Imagine your ideal digital experience—what do you wish existed on the web that doesn't today? Describe it in a few words, and let AI bring your vision to life."</p>

                <div className="p-3 border border-gray-700 rounded-xl max-w-2xl w-[90vw] mt-5 backdrop-blur-lg bg-white/10">
                    <div className="">
                        <textarea
                            onChange={(event) => setUserInput(event.target.value)}
                            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none "
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

                {/* 💡 Suggestions */}
                <div className="flex flex-wrap justify-center max-w-2xl mt-5">
                    {Lookup.SUGGSTIONS.map((suggetion, index) => (
                        <h2
                            key={index}
                            onClick={() => onGenerate(suggetion)}
                            className={`p-1 px-2 border rounded-full text-sm cursor-pointer m-1 transition-all delay-75 ease-in border-gray-700`}
                        >
                            {suggetion}
                        </h2>
                    ))}
                </div>

                {/* 🔐 Login Dialog */}
                <LoginDialog openDialog={openDialog} closeDialog={() => setOpenDialog(false)} />
            </div>

        </div>

    )
}

export default Hero