"use client"

import React, { useContext } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { useTheme } from 'next-themes';
import { useGoogleLogin } from '@react-oauth/google';
import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { CreateUser } from '@/convex/users';
import { api } from '@/convex/_generated/api';
import uuid4 from 'uuid4';
import { toast } from 'sonner';

function LoginDialog({ openDialog, closeDialog }) {
    const { theme, setTheme } = useTheme();
    const { userData, setUserData } = useContext(UserContext);
    const createUser = useMutation(api.users.CreateUser);

    const reloadPage = () => {
        window.location.reload();
    };

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ` + tokenResponse?.access_token,
                    }
                }
            );
            setUserData(userInfo?.data);

            // Close sign in dialog
            closeDialog(false);

            // Save user into DB
            await createUser({
                username: userInfo.data.name,
                email: userInfo.data.email,
                picture: userInfo.data.picture,
                uid: uuid4(),
            });

            // Save to local storage
            if (typeof window !== undefined) {
                localStorage.setItem('user', JSON.stringify(userInfo?.data));
            }

            reloadPage();

            toast.success("Login successfully", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                    label: "Ok",
                    onClick: () => console.log("ok"),
                },
            })

            console.log(userInfo);
        },
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent className='pb-6 drop-shadow-5xl'>
                <DialogHeader className="flex items-center">
                    <DialogTitle className="text-4xl mb-5">
                        <div className='flex flex-col items-center'>
                            <img src="logo.png" className='w-40' alt="logo" />
                            <div>Continue With Next<span className='text-[45px]' style={{ color: Colors.MAIN }}>Dev</span></div>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        <span className="flex flex-col items-center">
                            <span className='text-[17px] text-center'>{Lookup.SIGNIN_SUBHEADING}</span>
                            <Button onClick={login} className="my-5 active:opacity-85 transition-opacity delay-75 ease-out  cursor-pointer" style={{ backgroundColor: Colors.MAIN }}>
                                <img key={theme} src={theme === "dark" ? "/google-dark.svg" : "/google-light.svg"} className='w-6' />
                                Sign in with google
                            </Button>
                            <span className='text-gray-500 text-center'>By signing in, you agree to our <a href="#" className='text-blue-700'>Terms of Service</a> and <a href="#" className='text-blue-700'>Privacy Policy</a>, including the collection and use of your data as described.</span>
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default LoginDialog