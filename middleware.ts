import { NextRequest, NextResponse } from "next/server";

// En enkel middleware som bara släpper igenom alla begärningar utan att kolla autentisering
export async function middleware(req: NextRequest) {
    const token = req.cookies.get("next-auth.session-token")

    // if (req.nextUrl.pathname === "/projects" && !token) {
    //     return NextResponse.redirect(new URL("/auth/login", req.url))
    // }

    return NextResponse.next(); // Släpper igenom alla förfrågningar
}

// Konfigurera vilka sidor som ska hanteras av middleware
export const config = {
    matcher: '/(.*)', // Detta betyder att alla sidor kommer att matchas
};
