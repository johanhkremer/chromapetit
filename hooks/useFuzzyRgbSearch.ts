import { useState } from "react";
import { Paint } from "@/app/types/colors.types";

interface UsePaintSearchResult {
    filteredData: Paint[];
    setQuery: (query: string) => void;
    setIsFuzzy: (isFuzzy: boolean) => void;
    isFuzzy: boolean
}

export function usePaintSearch(data: Paint[]): UsePaintSearchResult {
    const [query, setQuery] = useState<string>("");
    const [isFuzzy, setIsFuzzy] = useState<boolean>(false);

    // Funktion för att beräkna färgavstånd
    function calculateColorDistance(rgb1: [number, number, number], rgb2: [number, number, number]): number {
        const [r1, g1, b1] = rgb1;
        const [r2, g2, b2] = rgb2;
        return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
    }

    // Fuzzy-sökning baserat på RGB-värde
    function fuzzySearchSimilarColors(baseRgb: [number, number, number], data: Paint[], threshold: number = 100): Paint[] {
        return data.filter((paint) =>
            calculateColorDistance(baseRgb, [paint.red, paint.green, paint.blue]) <= threshold
        );
    }

    // Filtrera data baserat på användarens input
    const filteredData = isFuzzy
        ? (() => {
            // Hitta den färg som matchar användarens input
            const basePaint = data.find((paint) =>
                paint.name.toLowerCase().includes(query.toLowerCase())
            );
            if (!basePaint) return []; // Om ingen match hittas, returnera tom array
            // Fuzzy-matcha baserat på RGB-värde
            return fuzzySearchSimilarColors(
                [basePaint.red, basePaint.green, basePaint.blue],
                data
            );
        })()
        : data.filter((paint) => paint.name.toLowerCase().includes(query.toLowerCase()));

    return { filteredData, setQuery, setIsFuzzy, isFuzzy };
}
