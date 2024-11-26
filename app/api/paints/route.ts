import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export const GET = async (request: NextRequest) => {
    try {
        // Hämta sida och antal per sida från query parameters
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = 8; // Antal färger per sida

        // Räkna totalt antal färger
        const totalPaints = await prisma.paint.count();

        // Hämta färger med pagination
        const paints = await prisma.paint.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return NextResponse.json({
            paints,
            totalPaints,
            page,
            pageSize
        });

    } catch (error) {
        console.error('Error fetching paints:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching paints' },
            { status: 500 }
        );
    }
}