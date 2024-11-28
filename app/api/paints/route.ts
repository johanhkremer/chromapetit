import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = 25;

        const totalPaints = await prisma.paint.count();

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