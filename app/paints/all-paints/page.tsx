import { Paint } from '@/app/types/colors.types';
import ColorCircle from '@/components/ColorCircle';
import PaginationComponent from '@/components/PaginationComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

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
        totalPaints,
        pageSize
    }: PaintResponse = await res.json();

    return (
        <main className='flex items-center'>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">All Paints</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {allPaints.map((paint) => (
                        <Card key={paint.id} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg shadow-md">
                            <CardHeader>
                                <CardDescription className='flex flex-col items-center'>
                                    {paint.brand}
                                </CardDescription>
                                <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap">{paint.name}</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col items-center'>
                                <ColorCircle hexCode={paint.hexCode} finish={paint.finish} />
                                <p className='pt-2 text-gray-400'>{paint.finish}</p>
                            </CardContent>

                            <CardFooter className='flex flex-col'>
                                <div className='flex text-xs pb-1'>
                                    <p>Updated:</p>
                                    <p>{paint.updatedAt ? (
                                        new Date(paint.updatedAt).toLocaleDateString()
                                    ) : (
                                        new Date(paint.createdAt).toLocaleDateString()
                                    )}</p>
                                </div>
                                <Button>Find Similar paints</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="mt-8 flex justify-center">
                    <PaginationComponent
                        itemCount={totalPaints}
                        pageSize={pageSize}
                        currentPage={page}
                    />
                </div>
            </div>
        </main>
    )
}

export default AllPaintsPage