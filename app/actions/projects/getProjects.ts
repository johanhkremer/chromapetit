import { auth } from "@/auth";
import { prisma } from "@/prisma";

const getProjects = async () => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return { error: "Not authenticated" };
    }

    try {
        const projects = await prisma.project.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });

        return projects;
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}