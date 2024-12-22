import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface Props {
    trigger: string
    content: string
}

const TooltipComponent = ({ trigger, content }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>{trigger}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <span className='text-base'>{content}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipComponent