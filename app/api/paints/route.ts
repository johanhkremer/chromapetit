import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export const GET = async () => {
    try {

        const paints = await prisma.paint.findMany()

        if (!paints || paints.length === 0)
            return NextResponse.json(
                { error: 'Paints not found' },
                { status: 404 }
            )

        return NextResponse.json(paints)

    } catch (error) {
        console.error('Error fetching paints:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching paints' },
            { status: 500 }
        );
    }
}