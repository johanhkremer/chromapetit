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
            },
        });

        if (!project) {
            throw new Error('Project not found');
        }

        const paints = project.paints.map(paintOnProject => paintOnProject.paint);

        const responseData = {
            id: project.id,
            name: project.name,
            description: project.description,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            paints: paints,
        };

        return responseData;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

export default getProjectById;