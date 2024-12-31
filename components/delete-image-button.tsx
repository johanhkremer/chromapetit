'use client'

import useDeleteImage from "@/hooks/use-delete-image";
import { toast } from 'sonner';

interface DeleteImageButtonProps {
    imageUrl: string;
    imageId?: string;
    onDelete: () => void;
}

const DeleteImageButton = ({ imageUrl, imageId, onDelete }: DeleteImageButtonProps) => {
    const { deleteImage, isPending } = useDeleteImage({ imageId });

    const handleDelete = async () => {

        const result = await deleteImage(imageUrl);
        if (result.success) {
            toast.success('Image deleted successfully!');
            onDelete();
        } else {
            toast.error(`Error: ${result.error}`);
        }
    };

    return (

        <button onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete Image'}
        </button>
    )
}

export default DeleteImageButton