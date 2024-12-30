'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";

const deleteProjectImage = async (imageId: string) => {
    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        return { success: false, error: "Not authenticated", status: 401 }
    }

    if (!imageId) {
        return { success: false, error: "Invalid image ID", status: 400 }
    }

    try {
        const image = await prisma.projectImage.findUnique({
            where: { id: imageId },
            select: { projectId: true },
        })

        if (!image) {
            return { success: false, error: "Image not found", status: 404 }
        }

        const project = await prisma.project.findUnique({
            where: { id: image.projectId },
            select: { userId: true },
        })

        if (!project || project.userId !== session.user.id) {
            return { success: false, error: "Unauthorized", status: 403 }
        }

        await prisma.projectImage.delete({ where: { id: imageId } })

        return { success: true }
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { success: false, error: err.message, status: 500 }
        } else {
            return { success: false, error: "An error occurred", status: 500 }
        }
    }
}

export default deleteProjectImage;