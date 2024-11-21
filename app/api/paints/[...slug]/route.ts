import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const GET = async (_: NextRequest, { params }: { params: { slug: string[] } }) => {
    const [type, query] = params.slug || [];

    if (!type || !query) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (type === "search") {
        const paint = await prisma.paint.findFirst({
            where: {
                name: {
                    contains: query,
                },
            },
        });

        if (!paint) {
            return NextResponse.json({ error: "No paint found with this name" }, { status: 404 });
        }

        const similarPaints = await prisma.paint.findMany({
            where: {
                hexCode: paint.hexCode,
                id: {
                    not: paint.id
                }
            },
        });

        return NextResponse.json({
            searchedPaint: paint,
            similarPaints
        });
    }

    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
};