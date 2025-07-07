import React from 'react';

interface ColorCircleProps {
    hexCode: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    category?: string;
    tags?: string[];
}

const ColorCircle: React.FC<ColorCircleProps> = ({
    hexCode,
    size = 'md',
    category,
    tags
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    const isMetallic = tags?.includes('Metallic');
    const isShade = category === 'Shade' || category === 'Contrast';

    const isValidHex = /^#[0-9A-F]{6}$/i.test(hexCode);

    if (!isValidHex) {
        console.warn(`Invalid hexCode: ${hexCode}`);
        hexCode = '#FFFFFF';
    }

    return (
        <div
            role="img"
            aria-label={`Color swatch with ${category || 'default'} finish and type ${tags || 'default'}`}
            className={`
                ${sizeClasses[size]} 
                rounded-full
                shadow-md
                `}
            style={
                isMetallic
                    ? {
                        backgroundImage: `linear-gradient(30deg, ${hexCode} 25%, white 50%, ${hexCode} 75%)`,
                        backgroundPosition: 'top left'
                    }
                    : isShade
                        ? {
                            backgroundImage: `linear-gradient(to bottom, ${hexCode}, #d3d3d3)`,
                        }
                        : { backgroundColor: hexCode }
            }
        />
    );
};

export default ColorCircle;
