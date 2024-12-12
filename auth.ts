import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})