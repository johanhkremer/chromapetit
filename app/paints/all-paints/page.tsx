import { Paint } from '@/app/types/colors.types';
import React from 'react'
import { paintColumns } from './components/PaintsColums'
import { DataTable } from '@/components/DataTable';

interface PaintResponse {
    paints: Paint[];
    totalPaints: number;
    pageSize: number;
    page: number;
}

const AllPaintsPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
    const params = await searchParams;

    const page = parseInt((params.page || '1'), 10);

    const res = await fetch(`http://localhost:3000/api/paints?page=${page}`, {
        cache: 'no-cache',
    });

    if (!res.ok) {
        return (
            <div>
                <h1>All Paints Page</h1>
                <p>Failed to fetch paints.</p>
            </div>
        );
    }

    const {
        paints: allPaints,
    }: PaintResponse = await res.json();

    return (
        <main className='flex items-center'>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">All Paints</h1>
                <DataTable columns={paintColumns} data={allPaints} />
            </div>
        </main>
    )
}

export default AllPaintsPage