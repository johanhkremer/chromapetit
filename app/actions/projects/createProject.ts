'use server'

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { CreateProjectSchema } from "@/schemas/CreateProjectSchema";
import { createServerAction } from "zsa";

export const createProject = createServerAction()
    .input(CreateProjectSchema)
    .handler(async (input) => {

        console.log("Creating project", input);
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return { success: false, message: "User not found" };
        }

        const projectData = input.input;

        console.log(projectData);

        try {
            const project = await prisma.project.create({
                data: {
                    name: projectData.name,
                    description: projectData.description,
                    userId: session.user.id,
                    paints: {
                        create: projectData.paints?.map((paint) => ({
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
            return { success: true, message: "Project created successfully!" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Error creating project" };
        }
    });
