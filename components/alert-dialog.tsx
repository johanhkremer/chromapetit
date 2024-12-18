'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface AlertDialogProjectProps {
    title: string;
    description: string;
    onContinue: () => void;
    onCancel: () => void;
    isOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertDialogProject = ({ title, description, onContinue, onCancel, isOpen, setIsDialogOpen }: AlertDialogProjectProps) => {

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default AlertDialogProject
