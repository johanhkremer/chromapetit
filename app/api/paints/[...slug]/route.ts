import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const GET = async (_: NextRequest, { params }: { params: { slug: string[] } }) => {
    const [type, query] = params.slug || []; // Delar upp segmenten i "type" och "query"

    if (!type || !query) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (type === "search") {
        // Hämta färgen baserat på sökfrågan (namn)
        const paint = await prisma.paint.findFirst({
            where: {
                name: {
                    contains: query, // Partiell matchning
                },
            },
        });

        console.log("Paints found:", paint); // Logga resultatet för att verifiera


        if (!paint) {
            return NextResponse.json({ error: "No paint found with this name" }, { status: 404 });
        }

        // Hämta alla färger med samma hexCode
        const similarPaints = await prisma.paint.findMany({
            where: {
                hexCode: paint.hexCode, // Matchar samma hexCode

            },
        });

        console.log("Similar paints found:", similarPaints); // Logga liknande färger


        return NextResponse.json({ similarPaints });
    }

    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
};
