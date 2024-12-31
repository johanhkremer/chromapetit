import { useState } from 'react';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import deleteProjectImage from '@/app/actions/projects/deleteProjectImage';

interface DeleteImageProps {
    imageId?: string;
}

const useDeleteImage = ({ imageId }: DeleteImageProps) => {
    const [isPending, setIsPending] = useState(false);

    const deleteImage = async (imageUrl: string) => {
        setIsPending(true);

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

            setIsPending(false);
            return { success: true };

        } catch (err: unknown) {
            setIsPending(false);
            if (err instanceof Error) {
                return { success: false, error: err.message };
            } else {
                return { success: false, error: 'An unknown error occurred.' };
            }
        }
    };

    return {
        deleteImage,
        isPending,
    };
};

export default useDeleteImage;
