'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { CreateProjectSchema } from "@/schemas/CreateProjectSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerAction } from "zsa"

export const CreateProject = createServerAction()
    .input(CreateProjectSchema)
    .handler(async (input) => {
        const session = await auth();
        console.log(input);

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        try {
            const project = await prisma.project.create({
                data: {
                    name: input.input.name,
                    description: input.input.description,
                    userId: session?.user?.id || "",
                    paints: {
                        create: input.input.paints?.map((paint) => ({
                            paintId: paint.id,
                        })) || [],
                    },
                    // images: {
                    //     create: validation.images?.map((image) => ({
                    //         imageUrl: image.imageUrl,
                    //     })) || [],
                    // },
                },
            });

            console.log(project);
            return { success: true };
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json(
                    { error: "Invalid input", details: error.errors },
                    { status: 400 }
                );
            }

            return NextResponse.json({ error: "Internal server error", details: (error as Error).message }, { status: 500 });
        }
    });