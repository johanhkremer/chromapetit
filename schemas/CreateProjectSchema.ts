import { z } from 'zod';

export const CreateProjectSchema = z.object({
    name: z.string().min(1, { message: "Project name is required" }).max(100, { message: "Project name must be 100 characters or less" }),
    description: z.string().optional(),
    paints: z.array(z.object({
        paintId: z.number().int()
    })).optional(),
    images: z.array(z.object({
        imageUrl: z.string().url()
    })).optional()
});

// Type for the validated project data
export type CreateProjectData = z.infer<typeof CreateProjectSchema>;