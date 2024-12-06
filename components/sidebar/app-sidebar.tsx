"use client"

import * as React from "react"
import { Palette, Wrench, Brush, Shield, Home, Users, Paintbrush2 } from "lucide-react"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import { Logo } from "@/components/sidebar/logo"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"

const data = {
    teams: [
        {
            name: "ChromaPetit",
            logo: Brush,
            plan: "Miniature painting",
        },
    ],
    navMain: [
        {
            title: "Paints",
            url: "#",
            icon: Palette,
            isActive: true,
            items: [
                {
                    title: "Find similar paints",
                    url: "/paints",
                },
                {
                    title: "All paints",
                    url: "/paints/all-paints",
                },
            ],
        },
        {
            title: "Tools and techniques",
            url: "#",
            icon: Wrench,
            items: [
                {
                    title: "Tools",
                    url: "#",
                },
                {
                    title: "Techniques",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Warhammer 40K: Space Marine Chapter",
            url: "#",
            icon: Shield,
        },
        {
            name: "Fantasy Terrain Painting",
            url: "#",
            icon: Home,
        },
        {
            name: "D&D Miniature Collection",
            url: "#",
            icon: Users,
        },
        {
            name: "Custom Paint Schemes",
            url: "#",
            icon: Paintbrush2,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: session, status } = useSession()
    const isLoading = status === "loading"

    const user = session?.user
        ? {
            name: session.user.name || "Unknown User",
            email: session.user.email || "No email",
            avatar: session.user.image || "/default-avatar.png",
        }
        : undefined

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Logo teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                {!isLoading ? (
                    <NavUser user={user} />
                ) : (
                    <div className="flex items-center justify-center h-16">
                        <span>Loading...</span>
                    </div>
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
