import { z } from 'zod';

export const CreateProjectSchema = z.object({
    name: z.string()
        .min(1, { message: "Project name is required" })
        .max(50, { message: "Project name must be 50 characters or less" }),
    description: z
        .string()
        .optional(),
    paints: z
        .array(z.object({
            id: z.string(),
            name: z.string(),
            brand: z.string(),
            hexCode: z.string(),
            red: z.number(),
            green: z.number(),
            blue: z.number(),
            discontinued: z.boolean(),
            createdAt: z.union([z.string(), z.date()]),
            updatedAt: z.union([z.string(), z.date(), z.null()]),
            type: z.string(),
            finish: z.string().optional(),
        }))
        .optional(),
    images: z
        .array(z.object({
            imageUrl: z
                .string()
                .url()
        })).optional()
});

//Schema for POST project
export type CreateProjectData = z.infer<typeof CreateProjectSchema>;

export const ProjectSchema = CreateProjectSchema.extend({
    id: z.number().int(),
});

//Schema for GET project, with id included
export type ProjectData = z.infer<typeof ProjectSchema>;

//Schema for Project with paints included
export const ProjectWithPaintsSchema = ProjectSchema.extend({
    paints: z.array(z.object({
        id: z.string(),
        name: z.string(),
        hexCode: z.string(),
        finish: z.string(),
        type: z.string(),
    })),
});

export type ProjectWithPaintsData = z.infer<typeof ProjectWithPaintsSchema>;