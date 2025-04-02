"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronRight,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  Plus,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { Collapsible } from "./ui/collapsible"
import { UserContext } from "@/context/UserContext"
import { Button } from "./ui/button"
import { useConvex, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const data = {
  navMain: [
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Gemini 2.0 Flash",
          url: "https://ai.google.dev/gemini-api/docs/pricing#gemini-2.0-flash",
        },
        {
          title: "Gemini 2.0 Flash-Lite",
          url: "https://ai.google.dev/gemini-api/docs/pricing#gemini-2.0-flash-lite",
        },
        {
          title: "Imagen 3",
          url: "https://ai.google.dev/gemini-api/docs/pricing#imagen-3",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {

  const { userData, setUserData } = React.useContext(UserContext);
  const [workspaces, setWorkspaces] = React.useState([]);
  const convex = useConvex();
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  React.useEffect(() => {
    if (userData?._id) {
      GetAllWorkspaces();
      console.log('got');
    }
  }, [userData])

  async function GetAllWorkspaces() {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userData?._id
    })
    setWorkspaces(result);
    console.log(result);
  }

  async function onCreateNew() {

    if (!userData?._id) {
      return;
    }

    const workspaceId = await CreateWorkspace({
      user: userData._id,
      messages: []
    });

    console.log(workspaceId);
    router.push('/workspace/' + workspaceId);

    toast.success("New Chat!",
      {
        description: "Chat created successfully!",
        action: {
          label: "Ok",
          onClick: () => console.log("ok"),
        },
      })
  }

  return (
    <Sidebar collapsible="icon" className=''>
      <SidebarHeader>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip="NextDev" className="h-15 p-3 mt-2" onClick={() => router.push('/')}>
              <img src="/logo.png" className="w-15" />
              <span className="text-2xl font-bold">Next<span className="text-[33px] text-[#009d70]">Dev</span></span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </Collapsible>
      </SidebarHeader>
      <SidebarContent>
        {userData?._id && (
          <SidebarMenuButton onClick={onCreateNew} className='h-13 bg-[#009d70] text-white font-bold mx-[7px]  w-[270px] lg:w-[240px] mb-1 mt-4' tooltip="New Chat">
            <Plus className="" />
            <span className="ml-1">Create New Chat</span>
          </SidebarMenuButton>
        )}
        <NavMain items={data.navMain} />
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-hide">
          <NavProjects projects={workspaces} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        {userData && <NavUser user={{
          name: userData?.username,
          email: userData?.email,
          avatar: userData?.picture,
        }} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
