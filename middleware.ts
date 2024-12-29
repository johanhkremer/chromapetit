import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })

    if (!token && req.nextUrl.pathname.startsWith("/projects")) {
        const loginUrl = new URL("/auth/login", req.nextUrl.origin)
        return NextResponse.redirect(loginUrl)
    }

    if (req.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.next();
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/projects(/:path*)",
    ],
}
