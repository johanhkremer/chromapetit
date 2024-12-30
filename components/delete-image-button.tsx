import useDeleteImage from "@/hooks/use-delete-image";

interface DeleteImageButtonProps {
    imageUrl: string;
    imageId?: string;
}

const DeleteImageButton = ({ imageUrl, imageId }: DeleteImageButtonProps) => {
    const { deleteImage, isDeleting, error } = useDeleteImage({ imageId });

    const handleDelete = async () => {

        const result = await deleteImage(imageUrl);
        if (result.success) {
            alert('Image deleted successfully!');
        } else {
            alert(`Error: ${result.error}`);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Image'}
            </button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default DeleteImageButton


