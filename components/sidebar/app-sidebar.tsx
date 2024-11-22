"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    Palette,
    Wrench,
    Brush,
    Shield,
    Home,
    Users,
    Paintbrush2
} from "lucide-react"

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

// This is sample data.
const data = {
    user: {
        name: "Johan Kremer",
        email: "johan.h.kremer@gmail.com",
        avatar: "/dragon-icon.jpg",
    },
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
                    url: "colors",
                },
                {
                    title: "All paints",
                    url: "#",
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
        // {
        //     title: "Documentation",
        //     url: "#",
        //     icon: BookOpen,
        //     items: [
        //         {
        //             title: "Introduction",
        //             url: "#",
        //         },
        //         {
        //             title: "Get Started",
        //             url: "#",
        //         },
        //         {
        //             title: "Tutorials",
        //             url: "#",
        //         },
        //         {
        //             title: "Changelog",
        //             url: "#",
        //         },
        //     ],
        // },
        // {
        //     title: "Settings",
        //     url: "#",
        //     icon: Settings2,
        //     items: [
        //         {
        //             title: "General",
        //             url: "#",
        //         },
        //         {
        //             title: "Team",
        //             url: "#",
        //         },
        //         {
        //             title: "Billing",
        //             url: "#",
        //         },
        //         {
        //             title: "Limits",
        //             url: "#",
        //         },
        //     ],
        // },
    ],
    projects: [
        {
            name: "Warhammer 40K: Space Marine Chapter",
            url: "#",
            icon: Shield, // Ikon som representerar Space Marines, du kan ändra till något mer specifikt
        },
        {
            name: "Fantasy Terrain Painting",
            url: "#",
            icon: Home, // En ikon som representerar terräng, t.ex. ett hus
        },
        {
            name: "D&D Miniature Collection",
            url: "#",
            icon: Users, // Ikon som symboliserar karaktärer/grupper
        },
        {
            name: "Custom Paint Schemes",
            url: "#",
            icon: Paintbrush2, // Ikon för målarverktyg
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
