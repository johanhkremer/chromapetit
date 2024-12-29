import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
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
                    access_type: "offline",
                    redirect_uri: `${process.env.AUTH_URL}/api/auth/callback/google`,
                },
            },
        }),
        Credentials({
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
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id as string
            }
            return session
        }
    },
    // cookies: {
    //     sessionToken: {
    //         name: `__Secure-next-auth.session-token`,
    //         options: {
    //             httpOnly: true,
    //             sameSite: "lax",
    //             path: "/",
    //             secure: process.env.NODE_ENV === "production",
    //         },
    //     },
    // },
    // secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
