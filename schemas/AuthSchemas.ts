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

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter valid email address"
    }),
    password: z.string().min(1, {
        message: "Please enter valid password"
    }),
});