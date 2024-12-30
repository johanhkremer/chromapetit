import { useState } from 'react';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import deleteProjectImage from '@/app/actions/projects/deleteProjectImage';

interface DeleteImageProps {
    imageId?: string;
}

const useDeleteImage = ({ imageId }: DeleteImageProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteImage = async (imageUrl: string) => {
        setIsDeleting(true);
        setError(null);

        try {
            const filePath = imageUrl.split('/o/')[1]?.split('?')[0];

            if (!filePath) {
                throw new Error('Invalid image URL.');
            }

            const imageRef = ref(storage, decodeURIComponent(filePath));

            await deleteObject(imageRef);

            if (imageId) {
                try {
                    const response = await deleteProjectImage(imageId);
                    if (!response.success) {
                        throw new Error(response.error);
                    } else {
                        return { success: true };
                    }
                } catch (err: unknown) {
                    throw new Error((err as Error).message);
                }
            }

            setIsDeleting(false);
            return { success: true };
        } catch (err: unknown) {
            setIsDeleting(false);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred while deleting the image.');
            }
            return { success: false, error: (err as Error).message };
        }
    };

    return {
        deleteImage,
        isDeleting,
        error,
    };
};

export default useDeleteImage;
