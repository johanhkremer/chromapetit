import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';

interface GetPaintProps {
    params: { id: string }
}

export const GET = async (request: NextRequest, { params }: GetPaintProps) => {
    const paint = await prisma.paint.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!paint)
        return NextResponse.json(
            { error: 'Paint not found' },
            { status: 404 }
        )

    return NextResponse.json(paint)
}

// export const POST = (request: NextRequest, { params: { id } }: GetPaintProps) => { }

// export const PUT = (request: NextRequest, { params: { id } }: GetPaintProps) => { }

// export const DELETE = (request: NextRequest, { params: { id } }: GetPaintProps) => { }
