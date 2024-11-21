interface ColorCircleProps {
    hexCode: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ColorCircle: React.FC<ColorCircleProps> = ({
    hexCode,
    size = 'md'
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    }

    return (
        <div
            className={`
          ${sizeClasses[size]} 
          rounded-full 
          border 
          border-gray-200
        `}
            style={{
                backgroundColor: hexCode
            }}
        />
    )
}

export default ColorCircle