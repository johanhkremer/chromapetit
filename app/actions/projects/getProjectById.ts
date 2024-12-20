'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";

const getProjectById = async (projectId: string) => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        throw new Error("Not authenticated");
    }

    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                paints: {
                    include: {
                        paint: true,
                    },
                },
                images: true,
            },
        });

        if (!project) {
            throw new Error('Project not found');
        }

        return project;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

export default getProjectById;