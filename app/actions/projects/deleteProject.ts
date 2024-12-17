import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

const deleteProject = async (projectId: string) => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 });
    }

    try {
        const project = await prisma.project.delete({
            where: { id: projectId },
        });
        return NextResponse.json(project);
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export default deleteProject;