import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@/auth";
import { CreateProjectSchema } from "@/schemas/CreateProjectSchema";
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

export const POST = async (req: NextRequest, res: NextResponse) => {
    const session = await auth();

    try {
        const body = await req.json();
        const validation = CreateProjectSchema.parse(body);

        // Skapa projekt i databasen
        const project = await prisma.project.create({
            data: {
                name: validation.name,
                description: validation.description,
                userId: session?.user?.id || "",
                paints: {
                    create: validation.paints?.map((paint) => ({
                        paintId: paint.paintId,
                    })) || [],
                },
                images: {
                    create: validation.images?.map((image) => ({
                        imageUrl: image.imageUrl,
                    })) || [],
                },
            },
        });

        return NextResponse.json(project, { status: 201 });
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


