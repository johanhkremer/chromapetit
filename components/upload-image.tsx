import { storage } from "@/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import Image from "next/image";

interface ImageUploadProps {
    onChange: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Image upload failed:", error);
                    setIsUploading(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(storageRef);
                    setUploadedImages(prev => [...prev, downloadURL]);
                    onChange(downloadURL);
                    setIsUploading(false);
                }
            );
        } catch (error) {
            console.error("Image upload failed:", error);
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4">
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

            {isUploading && (
                <div className="space-y-2">
                    <Progress value={uploadProgress} className="w-full h-2" />
                    <p className="text-sm">
                        Uploading... {Math.round(uploadProgress)}%
                    </p>
                </div>
            )}

            {uploadedImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {uploadedImages.map((url, index) => (
                        <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                        >
                            <Image
                                src={url}
                                alt={`Uploaded image ${index + 1}`}
                                width={300}
                                height={300}
                                sizes="(max-width: 640px) 100vw, 300px"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;