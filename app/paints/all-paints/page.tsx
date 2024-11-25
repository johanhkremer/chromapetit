import { Paint } from '@/app/types/colors.types';
import ColorCircle from '@/components/ColorCircle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

const AllPaintsPage = async () => {

    const res = await fetch('http://localhost:3000/api/paints', {
        cache: 'reload'
    })

    if (!res.ok) {
        // Hantera fel (t.ex. 404 eller 500)
        return (
            <div>
                <h1>All Paints Page</h1>
                <p>Failed to fetch paints.</p>
            </div>
        );
    }

    const allPaints: Paint[] = await res.json();

    console.log(allPaints)

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">All Paints</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allPaints.map((paint) => (
                    <Card key={paint.id} className="p-3 bg-gray-50 rounded-lg shadow-md">
                        <CardTitle>{paint.name}</CardTitle>
                        <CardHeader>{paint.brand}</CardHeader>
                        <CardDescription>{paint.finish}</CardDescription>
                        <CardContent>
                            <ColorCircle hexCode={paint.hexCode} finish={paint.finish} />
                        </CardContent>
                        <CardFooter>
                            Latest updated: {paint.updatedAt ? (
                                new Date(paint.updatedAt).toLocaleDateString()
                            ) : (
                                new Date(paint.createdAt).toLocaleDateString()
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default AllPaintsPage