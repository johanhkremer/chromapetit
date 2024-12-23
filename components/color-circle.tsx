import React from 'react';

interface ColorCircleProps {
    hexCode: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    finish?: string;
    type?: string;
}

const ColorCircle: React.FC<ColorCircleProps> = ({
    hexCode,
    size = 'md',
    finish,
    type
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    const isMetallic = finish === 'Metallic';
    const isShade = type === 'Shade';

    const isValidHex = /^#[0-9A-F]{6}$/i.test(hexCode);

    if (!isValidHex) {
        console.warn(`Invalid hexCode: ${hexCode}`);
        hexCode = '#FFFFFF';
    }

    return (
        <div
            role="img"
            aria-label={`Color swatch with ${finish || 'default'} finish and type ${type || 'default'}`}
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
