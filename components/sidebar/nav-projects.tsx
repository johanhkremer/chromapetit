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
import { LogIn, FilePlus } from "lucide-react"

export function NavProjects() {
    const { isMobile } = useSidebar()
    const { data: session, status } = useSession()
    const isLoading = status === "loading"
    const [projects, setProjects] = useState<ProjectData[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProjectData = async () => {
            if (!session) {
                return
            }
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
    }, [session])

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <Link href="/projects">
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
            </Link>
            <SidebarMenu>
                {!session ? (<SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-sidebar-foreground/70">
                        <Link href="/auth/login" className="flex items-center">
                            <LogIn />
                            <span>Login to view projects</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>)
                    : isLoading ? ("Loading")
                        : error ? (<p className="text-red-500 text-sm">{error}</p>)
                            : (<>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className="">
                                        <Link href="/projects/create" className="flex items-center">
                                            <FilePlus />
                                            <span>Create new project</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                {projects.map((project) => (
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
