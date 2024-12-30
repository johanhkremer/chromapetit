import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Paint } from '@/schemas/PaintSchema';
import ColorCircle from "@/components/color-circle";
import { uniqBy } from 'lodash';
import { Card } from '@/components/ui/card';

// Helper method to calculate the distance between two colors based on RGB
const calculateRgbDistance = (color1: Paint, color2: { red: number; green: number; blue: number }) => {
    const rDiff = color1.red - color2.red
    const gDiff = color1.green - color2.green
    const bDiff = color1.blue - color2.blue
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff)
}

interface SimilarColorsButtonProps {
    paint: Paint;
    allPaints: Paint[];
}

export const SimilarColorsButton: React.FC<SimilarColorsButtonProps> = ({ paint, allPaints }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Memoize similar colors calculation
    const similarColors = useMemo(() => {
        // Threshold for how close colors need to be
        const threshold = 30  // Adjust this value as needed

        // Filter similar colors:
        // 1. Exclude the current paint
        // 2. Match finish (metallic only matches metallic)
        // 3. Within RGB distance threshold
        // 4. Remove duplicates by name
        // 5. Limit to 6 colors
        const filteredColors = allPaints
            .filter(p => p.id !== paint.id)
            .filter(otherPaint =>
                // Ensure finish matches exactly
                otherPaint.finish === paint.finish
            )
            .filter((otherPaint) => {
                const distance = calculateRgbDistance(otherPaint, {
                    red: paint.red,
                    green: paint.green,
                    blue: paint.blue
                });
                return distance <= threshold;
            });

        // Use lodash to remove duplicates by name, keeping the first occurrence
        return uniqBy(filteredColors, 'name').slice(0, 6);
    }, [paint, allPaints]);

    const getContrastColor = (hexColor: string) => {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        return luminance > 0.5 ? '#000000' : '#ffffff';
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    aria-label='Show similar colors'
                >
                    Similar Paints
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-0 border-0 rounded-lg">
                <DialogHeader
                    className="w-full p-2 owerflow-hidden rounded-t-lg"
                    style={{
                        backgroundColor: paint.hexCode,
                        color: getContrastColor(paint.hexCode)
                    }}
                >
                    <DialogTitle className="flex flex-col items-center gap-2">
                        <span className="text-sm font-light">Colors Similar to</span>
                        <span className="text-lg font-bold drop-shadow-lg">{paint.name}</span>
                    </DialogTitle>
                    <DialogDescription
                        className="flex flex-col items-center mt-1 text-sm font-light"
                        style={{
                            color: getContrastColor(paint.hexCode)
                        }}
                    >
                        {paint.brand}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 p-3">
                    {similarColors.map((similarPaint) => (
                        <Card
                            key={similarPaint.id}
                            className="flex items-center px-5 py-1"
                        >
                            <div className='flex-shrink-0'>
                                <ColorCircle
                                    hexCode={similarPaint.hexCode}
                                    size="sm"
                                    finish={similarPaint.finish}
                                    type={similarPaint.type}
                                />
                            </div>
                            <div className='flex-1 text-center'>
                                <p>{similarPaint.name}</p>
                            </div>
                            <div className='flex-shrink-0'>
                                <p>{similarPaint.brand}</p>
                            </div>

                        </Card>
                    ))}
                    {similarColors.length === 0 && (
                        <p className="text-center text-muted-foreground">
                            No similar colors found
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default SimilarColorsButton;