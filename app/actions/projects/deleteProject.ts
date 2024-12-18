'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";

const deleteProject = async (projectId: string) => {
    const session = await auth()

    console.log("Session data:", session)

    if (!session || !session.user || !session.user.id) {
        return { success: false, error: "Not authenticated", status: 401 }
    }

    console.log("Deleting project:", projectId)

    if (!projectId) {
        return { success: false, error: "Invalid project ID", status: 400 }
    }

    try {
        await prisma.project.delete({
            where: { id: projectId },
        })
        return { success: true, status: 200 }
    } catch (error) {
        console.error("Error deleting project:", error)
        return { success: false, error: "Internal server error", status: 500 }
    }
}

export default deleteProject;