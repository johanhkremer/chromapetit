import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

//GET unique project on user
export const GET = async (req: Request, { params }: { params: { id: string } }) => {

    try {
        const project = await prisma.project.findUnique({
            where: { id: params.id },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};

//Update project
export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const body = await req.json();
        const updatedProject = await prisma.project.update({
            where: { id: params.id },
            data: body,
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};

//Delete project
export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await prisma.project.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};
