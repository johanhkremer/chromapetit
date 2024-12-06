// schemas/projectSchema.ts
import { z } from "zod";

export const projectSchema = z.object({
    filter: z.string().optional(), // Valfritt filter för sökningar
    limit: z.number().min(1).max(100).optional(), // Max antal projekt att hämta
});
