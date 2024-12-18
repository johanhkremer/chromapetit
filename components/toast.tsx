'use client'

import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

interface ToastProps {
    title: string | "Success" | "Error" | "Warning",
    description: string
    variant?: "success" | "destructive" | "warning" | "default",
}

const Toast = ({ title, description, variant }: ToastProps) => {
    const { toast } = useToast()

    useEffect(() => {
        toast({
            variant,
            title: `${title}`,
            description: `${description}`,
        })
        console.log({ variant, title, description })

    }, [title, description, toast])

    return null
}

export default Toast