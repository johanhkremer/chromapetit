import Google from "next-auth/providers/google"
import Credentails from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas/AuthSchemas"
import bcrypt from "bcrypt"
import { prisma } from "./prisma"

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "select_account",
                },
            },
        }),
        Credentails({
            async authorize(credentials) {
                const validatedData = LoginSchema.safeParse(credentials)
                if (!validatedData.success) return null
                const { email, password } = validatedData.data
                const user = await prisma.user.findFirst({
                    where: {
                        email,
                    },
                })
                if (!user || !user.password || !user.email) return null
                const passwordMatch = await bcrypt.compare(password, user.password)

                if (passwordMatch) return user

                return null
            }
        }),
    ],
} satisfies NextAuthConfig