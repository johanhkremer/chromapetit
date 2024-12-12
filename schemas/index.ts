import { z } from 'zod'

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
    passwordConfirmation: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
});