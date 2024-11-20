import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export const GET = async () => {
    const paints = await prisma.paint.findMany()

    if (!paints || paints.length === 0)
        return NextResponse.json(
            { error: 'Paints not found' },
            { status: 404 }
        )

    return NextResponse.json(paints)
}