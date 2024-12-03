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
import { Paint } from "@/app/types/colors.types";
import ColorCircle from "@/components/ColorCircle";
import { uniqBy } from 'lodash';

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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Similar Paints
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className='flex flex-col items-center'>
                        <span className='text-base font-light'>Similar Colors to</span>
                        <span className='text-lg'>{paint.name}</span>
                    </DialogTitle>
                    <DialogDescription className='flex flex-col items-center'>
                        <ColorCircle
                            hexCode={paint.hexCode}
                            size="sm"
                            finish={paint.finish}
                            type={paint.type}
                        />
                        <p>{paint.brand}</p>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4">
                    {similarColors.map((similarPaint) => (
                        <div
                            key={similarPaint.id}
                            className="flex flex-col items-center space-y-2"
                        >
                            <ColorCircle
                                hexCode={similarPaint.hexCode}
                                size="lg"
                                finish={similarPaint.finish}
                                type={similarPaint.type}
                            />
                            <span className="flex flex-col text-xs text-center">
                                <p className='font-bold'>{similarPaint.name}</p>
                                <p>{similarPaint.brand}</p>
                            </span>
                        </div>
                    ))}
                </div>
                {similarColors.length === 0 && (
                    <p className="text-center text-muted-foreground">
                        No similar colors found
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SimilarColorsButton;