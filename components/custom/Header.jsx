"use client"

import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"
import Colors from '@/data/Colors'
import { UserContext } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { googleLogout } from '@react-oauth/google';
import { SidebarTrigger } from '../ui/sidebar';
import LoginDialog from './LoginDialog';
import { useRouter } from 'next/navigation';

function Header() {

    const reloadPage = () => {
        window.location.reload();
    };

    const { theme, setTheme } = useTheme();
    const [src, setSrc] = useState(<Moon />);
    const { userData, setUserData } = useContext(UserContext);
    const [profileImage, setProfileImage] = useState("logo.png");
    const [openDialog, setOpenDialog] = useState(false);
    const route = useRouter();

    useEffect(() => {
        setSrc(theme === "dark" ? <Moon /> : <Sun />);
    }, [theme]);

    useEffect(() => {
        console.log(`Image: ${userData?.picture}`);
        setProfileImage(userData?.picture)
    }, [userData])

    const handleLogoutSuccess = () => {
        console.log('Logged out successfully');
        localStorage.clear();
        googleLogout();
        setUserData(null);
        route.push('/');
        setTimeout(() => {
            reloadPage();
        }, 2000);

        setTimeout(() => {
            toast.error("Logout seccessfully!", {
                description: "",
                action: {
                    label: "Ok",
                    onClick: () => console.log("ok"),
                },
            })
        }, 5000);

    };

    return (
        <div className='p-4 flex justify-between items-center top-0 sticky'>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                </div>
            </header>

            <div className='flex gap-3'>
                <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{src}</Button>
                {!userData ?
                    <div className='flex gap-3'>
                        <Button variant="ghost" onClick={() => setOpenDialog(true)}>Sign in</Button>
                        <Button style={{ backgroundColor: Colors.MAIN }}>Get Started</Button>
                    </div> :
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="w-9 h-9">
                                <AvatarImage src={profileImage} className="" />
                                <AvatarFallback src="logo.png"></AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="me-3 mt-2">
                            <DropdownMenuLabel>
                                <div>
                                    <h3 className='text-[20px]'>{userData.username}</h3>
                                    <p className='text-[13px] text-gray-400'>{userData.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500" onClick={handleLogoutSuccess}>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
            <LoginDialog openDialog={openDialog} closeDialog={() => setOpenDialog(false)} />
        </div >
    )
}

export default Header