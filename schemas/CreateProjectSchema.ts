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
            id: z.string()
        }))
        .optional(),
    images: z
        .array(z.string().url()
        ).optional()
});

//Schema for POST project
export type CreateProjectData = z.infer<typeof CreateProjectSchema>;

export const ProjectSchema = CreateProjectSchema.extend({
    id: z.string(),
});

//Schema for GET project, with id included
export type ProjectData = z.infer<typeof ProjectSchema>;