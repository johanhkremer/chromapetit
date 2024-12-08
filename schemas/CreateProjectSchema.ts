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
            paintId: z
                .number().int()
        })).optional(),
    images: z
        .array(z.object({
            imageUrl: z
                .string()
                .url()
        })).optional()
});

export type CreateProjectData = z.infer<typeof CreateProjectSchema>;

export const CreatePaintSchema = z.object({
    name: z.string().min(1, { message: "Paint name is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    hexCode: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid hex color" }),
    red: z.number().int().min(0).max(255).optional(),
    green: z.number().int().min(0).max(255).optional(),
    blue: z.number().int().min(0).max(255).optional(),
    type: z.string().min(1, { message: "Type is required" }),
    discontinued: z.boolean().default(false),
    finish: z.string().optional(),
    description: z.string().optional(),
});

// const form = useForm<z.infer<typeof CreatePaintSchema>>({
//     resolver: zodResolver(CreatePaintSchema),
//     defaultValues: {
//       name: "",
//       brand: "",
//       hexCode: "#000000",
//       red: undefined,
//       green: undefined,
//       blue: undefined,
//       type: "",
//       discontinued: false,
//       finish: "",
//       description: "",
//     },
//   });
