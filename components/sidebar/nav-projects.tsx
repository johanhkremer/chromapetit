"use client"

import {
    Folder,
    Forward,
    MoreHorizontal,
    Sidebar,
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
    SidebarMenuSubButton,
    useSidebar,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { LogIn, FilePlus } from "lucide-react"
import LoadSpinner from "../load-spinner"
import deleteProject from "@/app/actions/projects/deleteProject"
import getProjects from "@/app/actions/projects/getProjects"
import { Project } from "@prisma/client"

export function NavProjects() {
    const { isMobile } = useSidebar()
    const { data: session, status } = useSession()
    const isLoading = status === "loading"
    const [projects, setProjects] = useState<Project[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (session) {
            getProjects().then((response) => {
                if (!response.success) {
                    console.error("Fetch error:", response.error)
                    setError(response.error || "Failed to fetch projects")
                } else {
                    console.log("Projects fetched successfully")
                    if (response.data)
                        setProjects(response.data)
                }
            })
        }
    }, [session])

    const handleDelete = async (projectId: string) => {
        if (!session) {
            return
        }

        console.log("Deleting project:", projectId)

        try {
            const response = await deleteProject(projectId)
            console.log('⭐️response:', response)
            if (!response.success) {
                console.error("Delete error:", response.error)
                setError(response.error || "Failed to delete project")
            } else if (response.success) {
                console.log("Project deleted successfully")
                setProjects((prev) => prev.filter((p) => p.id !== projectId))
            }
        } catch (error) {
            console.error("Unexpected error:", error)
            setError("Failed to delete project")
        }
    }

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <Link href="/projects">
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
            </Link>
            <SidebarMenu>
                {isLoading ? (
                    <div className="flex justify-center">
                        <LoadSpinner />
                    </div>
                ) : !session ? (
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-sidebar-foreground/70">
                            <Link href="/auth/login" className="flex items-center">
                                <LogIn />
                                <span>Login to view projects</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ) : error ? (
                    <p className="text-red-500 text-sm">{error}</p>
                ) : (
                    <>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/projects/create" className="flex items-center">
                                    <FilePlus />
                                    <span>Create new project</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {projects.map((project) => (
                            <SidebarMenuItem key={project.id}>
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
                                            <SidebarMenuSubButton asChild onClick={() => handleDelete(project.id)}>
                                                <div>
                                                    <Trash2 className="text-muted-foreground" />
                                                    <span>Delete Project</span>
                                                </div>
                                            </SidebarMenuSubButton>
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
