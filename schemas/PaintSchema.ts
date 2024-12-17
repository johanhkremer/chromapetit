import { z } from 'zod';

// Zod schema för Paint
export const PaintSchema = z.object({
    id: z.string(),
    name: z.string(),
    brand: z.string(),
    hexCode: z.string(),
    red: z.number(),
    green: z.number(),
    blue: z.number(),
    type: z.string(),
    discontinued: z.boolean().default(false),
    finish: z.string(),
    description: z.string().nullable(),
    createdAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]).nullable(),
});

// Infer TypeScript-typen från Zod-schema
export type Paint = z.infer<typeof PaintSchema>;
