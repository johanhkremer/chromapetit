'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";

const getProjects = async () => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return { success: false, error: "Not authenticated" };
    }

    try {
        const projectsData = await prisma.project.findMany({
            where: { userId: session.user.id },
            include: {
                images: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: projectsData };

    } catch (error) {
        console.error("Error fetching projects:", error);
        return { success: false, error: "Failed to fetch projects." };
    }
}

export default getProjects;