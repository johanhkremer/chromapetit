'use client'

import ColorCircle from "@/components/ColorCircle"
import { Paint } from "@/app/types/colors.types"
import { useEffect, useState } from "react"

interface ColorSearchResponse {
    searchedPaint: Paint | null;
    similarPaints: Paint[];
}

interface ColorSearchResponseProps {
    query: string
}

const PaintSearchResponse = ({ query }: ColorSearchResponseProps) => {
    const [searchResult, setSearchResult] = useState<ColorSearchResponse>({
        searchedPaint: null,
        similarPaints: []
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!query) return

        setIsLoading(true)

        const fetchPaints = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/paints/search/${query}`)

                if (!response.ok) {
                    throw new Error('Failed to get paints')
                }

                const data: ColorSearchResponse = await response.json()

                setSearchResult(data)
            } catch (error) {
                console.error(error)
                setSearchResult({ searchedPaint: null, similarPaints: [] })
            } finally {
                setIsLoading(false)
            }
        }
        fetchPaints()
    }, [query])

    return (
        <div>
            {isLoading ? (<p>Loading...</p>) : (
                <>
                    {searchResult.searchedPaint && (
                        <div>
                            <h2>Searched Paint</h2>
                            <p>{searchResult.searchedPaint.name}</p>
                            <h3>{searchResult.searchedPaint.brand}</h3>
                            <p>Type: {searchResult.searchedPaint.type}</p>
                            <ColorCircle size='sm' hexCode={searchResult.searchedPaint.hexCode} />
                        </div>
                    )}

                    {searchResult.similarPaints.length > 0 && (
                        <div>
                            <h2>Similar Paints</h2>
                            <ul>
                                {searchResult.similarPaints.map((paint) => (
                                    <li key={paint.id}>
                                        <p>{paint.name}</p>
                                        <h3>{paint.brand}</h3>
                                        <p>Type: {paint.type}</p>
                                        <ColorCircle size='sm' hexCode={paint.hexCode} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {!searchResult.searchedPaint && query && (
                        <p>No matching paints found</p>
                    )}
                </>
            )}
        </div>
    )
}

export default PaintSearchResponse