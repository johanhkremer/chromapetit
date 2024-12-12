"use server"

import * as z from 'zod'
import { prisma } from '@/prisma'
import bcrypt from 'bcrypt'
import { RegisterSchema } from '@/schemas/AuthSchemas'

export const register = async (data: z.infer<typeof RegisterSchema>) => {
    try {
        const validatedData = RegisterSchema.parse(data)

        if (!validatedData) {
            return { error: "Invalid input" }
        }

        const { email, name, password, passwordConfirmation } = validatedData

        if (password !== passwordConfirmation) {
            return { error: "Passwords do not match" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (existingUser) {
            return { error: "User already exists" }
        }

        const lowerCaseEmail = email.toLowerCase()

        const user = await prisma.user.create({
            data: {
                email: lowerCaseEmail,
                password: hashedPassword,
                name
            }
        })

        console.log(user)

        return { success: 'User created successfully' }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong" }
    }
}