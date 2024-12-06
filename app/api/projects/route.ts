import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@/auth";
import { projectSchema } from "@/schemas/projectSchema";
import { z } from "zod";

export const GET = async () => {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const projects = await prisma.project.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(projects);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validatedData = projectSchema.parse(body);

        const projects = await prisma.project.findMany({
            where: {
                userId: session.user.id,
                ...(validatedData.filter && {
                    name: { contains: validatedData.filter },
                }),
            },
            take: validatedData.limit || undefined,
        });

        return NextResponse.json(projects);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid input", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

