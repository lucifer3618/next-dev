"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { googleLogout } from "@react-oauth/google"
import { UserContext } from "@/context/UserContext"
import React, { useEffect, useState } from "react"
import { PriceDialog } from "./custom/PriceDialog"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function NavUser({
  user
}) {
  const { isMobile } = useSidebar();
  const { userData, setUserData } = React.useContext(UserContext);
  const [openDilaog, setOpenDialog] = useState(false);
  const route = useRouter();
  const [tokens, setTokens] = useState(userData?.token);

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    setTokens(userData?.token);
    console.log(tokens);
  }, [userData.token])

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
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => console.log("pro")}>
                  <Sparkles />
                  <div>
                    <h2>Tokens remaning:</h2>
                    <h2 className="text-bold text-2xl">{isNaN(tokens) ? "0" : tokens} /<span className="text-[20px] text-gray-400">50,000</span></h2>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogoutSuccess}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <PriceDialog openDialog={openDilaog} closeDialog={() => setOpenDialog(false)} />
    </div>
  );
}
