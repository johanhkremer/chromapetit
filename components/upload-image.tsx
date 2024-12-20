import { storage } from "@/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface ImageUploadProps {
    onChange: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
            await uploadBytesResumable(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            onChange(downloadURL);
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <label className="flex items-center gap-2 cursor-pointer">
                <UploadCloud className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Upload Image</span>
                <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                />
            </label>
            {isUploading && <p className="text-sm text-blue-500">Uploading...</p>}
        </div>
    );
};

export default ImageUpload;