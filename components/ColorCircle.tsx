import React from 'react';

interface ColorCircleProps {
    hexCode: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    finish?: string | null;
}

const ColorCircle: React.FC<ColorCircleProps> = ({
    hexCode,
    size = 'md',
    finish = null
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    }

    const isMetallic = ['Metallic', 'Gold', 'Silver', 'Steel', 'Brass', 'Copper', 'Bronze'].includes(finish || '');

    return (
        <div
            className={`
                ${sizeClasses[size]} 
                rounded-full 
                border 
                border-gray-200
                ${isMetallic ? 'shadow-inner shadow-white/40 dark:shadow-white/20 brightness-110 contrast-125' : ''}
            `}
            style={{
                backgroundColor: hexCode
            }}
        />
    )
}

export default ColorCircle;