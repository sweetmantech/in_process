"use client";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/lib/cropImage/getCroppedImage";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

interface CropImageProps {
    imageUri: string;
    previewSrc: string;
    closeModal: () => void;
    handleCroppedImage: (url: string, uri: string) => void
}

const CropImage = ({ previewSrc, imageUri, closeModal, handleCroppedImage }: CropImageProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isCropUploading, setIsCropUploading] = useState(false);

    const onCropComplete = (_: Area, cropped: Area) => {
        setCroppedAreaPixels(cropped);
    };

    const saveCroppedImage = async () => {
        if (!croppedAreaPixels || isCropUploading || !imageUri) return;
        try {
            setIsCropUploading(true);
            const imageSrc = previewSrc || imageUri;
            const resultUrl = (await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )) as string;
            const response = await fetch(resultUrl);
            const blob = await response.blob();
            const file = new File([blob], "preview.jpeg", {
                type: blob.type || "image/jpeg",
            });
            const uri = await clientUploadToArweave(file);
            handleCroppedImage(resultUrl, uri);
        } catch (err) {
            console.error(err);
            toast.error("Failed to crop image");
        } finally {
            setIsCropUploading(false);
        }
    };

    const handleCropImage = async () => {
        await saveCroppedImage();
        closeModal();
        toast.success("Image cropped successfully!");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                <div className="space-y-4">
                    <h3 className="font-archivo text-lg font-medium">Crop Image</h3>

                    <div className="relative h-64 w-full">
                        <Cropper
                            image={previewSrc || imageUri}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button
                            variant="outline"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCropImage}
                            disabled={isCropUploading}
                        >
                            {isCropUploading ? "Cropping..." : "Crop & Save"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CropImage;