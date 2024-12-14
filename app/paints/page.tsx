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

const AllPaintsPage = async () => {

    const res = await fetch(`http://localhost:3000/api/paints`, {
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
        <div className="container mt-7 pr-5 sm:w-full md:w-9/10 xl:w-4/5">
            <h1 className="text-xl font-bold mb-4">All Paints</h1>
            <DataTable columns={paintColumns} data={allPaints} />
        </div>
    )
}

export default AllPaintsPage