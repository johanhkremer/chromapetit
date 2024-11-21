'use client'

import ColorCircle from "@/app/components/ColorCircle"
import { Paint } from "@/app/types/colors.types"
import { useEffect, useState } from "react"

interface ColorResponseProp {
    query: string
}


const ColorSearchResponse = ({ query }: ColorResponseProp) => {
    const [paints, setPaints] = useState<Paint[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!query) return

        setIsLoading(true)

        const fetchPaints = async () => {

            try {
                const response = await fetch(`http://localhost:3000/api/paints/search/${query}`)

                console.log(response)

                if (!response.ok) {
                    throw new Error('Failes to get paints')
                }
                // Lägg till denna console.log för att se raw data
                const rawData = await response.json()
                console.log('Raw data:', rawData)

                // Om din API returnerar data i formatet { similarPaints: Paint[] }
                const data = Array.isArray(rawData) ? rawData : rawData.similarPaints

                setPaints(data)
            } catch (error) {
                console.error(error)
                setPaints([])
            } finally {
                setIsLoading(false)
            }
        }
        fetchPaints()
    }, [query])

    return (
        <div>
            {isLoading ? (<p>Loading...</p>) :
                paints.length > 0 ? (
                    <ul>
                        {paints.map((paint) => (
                            <li key={paint.id}>
                                <p>{paint.name}</p>
                                <h3>{paint.brand}</h3>
                                <p>Type: {paint.type}</p>
                                <ColorCircle size='sm' hexCode={paint.hexCode} />
                            </li>
                        ))}
                    </ul>

                ) : (query && <p>No matching paints found</p>)}
        </div>
    )
}

export default ColorSearchResponse
