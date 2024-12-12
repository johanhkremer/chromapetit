import Google from "next-auth/providers/google"
import Credentails from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

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
        Credentails({}),
    ],
} satisfies NextAuthConfig