'use server'

import * as z from 'zod'
import { prisma } from '@/prisma'
import { LoginSchema } from '@/schemas/AuthSchemas'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export const login = async (data: z.infer<typeof LoginSchema>) => {

    const validatedData = LoginSchema.parse(data)

    if (!validatedData) {
        return { error: "Invalid input" }
    }

    const { email, password } = validatedData

    const userExists = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!userExists || !userExists.password || !userExists.email) {
        return { error: "User not found" }
    }

    try {
        await signIn('credentials', {
            email: userExists.email,
            password: password,
            redirectTo: '/paints'
        }
        )

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Please confirm your email address" };
            }
        }
        throw error;
    }
    return { success: 'User logged in successfully' }
}