"use client"

import {
    Folder,
    Forward,
    MoreHorizontal,
    Trash2,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ProjectData } from "@/schemas/CreateProjectSchema"

export function NavProjects() {
    const { data: session, status } = useSession()
    const isLoading = status === "loading"
    console.log(session)
    const { isMobile } = useSidebar()
    const [projects, setProjects] = useState<ProjectData[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/projects`, {
                    cache: "no-cache",
                })

                if (!res.ok) {
                    throw new Error(`Error fetching projects: ${res.statusText}`)
                }

                const data = await res.json()
                setProjects(data)
            } catch (error) {
                console.error(error)
                setError("Failed to fetch projects")
            }
        }

        fetchProjectData()
    }, [])

    if (!session) {
        return null
    }

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <Link href="/projects">
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
            </Link>
            <SidebarMenu>
                {isLoading ? ("Loading")
                    : error ? (<p className="text-red-500 text-sm">{error}</p>)
                        : (<>{projects.map((project) => (
                            <SidebarMenuItem key={project.name}>
                                <SidebarMenuButton asChild>
                                    <a href={`http://localhost:3000/projects/${project.id}`}>
                                        <span>{project.name}</span>
                                    </a>
                                </SidebarMenuButton>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction showOnHover>
                                            <MoreHorizontal />
                                            <span className="sr-only">More</span>
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-48 rounded-lg"
                                        side={isMobile ? "bottom" : "right"}
                                        align={isMobile ? "end" : "start"}
                                    >
                                        <DropdownMenuItem>
                                            <Folder className="text-muted-foreground" />
                                            <span>View Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Forward className="text-muted-foreground" />
                                            <span>Share Project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Trash2 className="text-muted-foreground" />
                                            <span>Delete Project</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton className="text-sidebar-foreground/70">
                                    <MoreHorizontal className="text-sidebar-foreground/70" />
                                    <span>More</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </>
                        )}
            </SidebarMenu>
        </SidebarGroup>
    )
}

// Kan läggas ovanför span med projektnamn om jag orkar fixa med ikoner: <project.icon />
