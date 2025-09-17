"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useFileUpload from "@/hooks/useFileUpload";
import PreviewImage from "./PreviewImage";
import CropImage from "./CropImage";

interface ImageUploadProps {
    initialImageUri?: string;
    onImageChange: (imageUri: string) => void;
    disabled?: boolean;
}

const ImageUpload = ({ initialImageUri = "", onImageChange, disabled = false }: ImageUploadProps) => {
    const [imageUri, setImageUri] = useState(initialImageUri);
    const [previewSrc, setPreviewSrc] = useState("");
    const [previewUri, setPreviewUri] = useState("");
    const [animationUri, setAnimationUri] = useState("");
    const [, setMimeType] = useState("");
    const [showCropModal, setShowCropModal] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialImageUri && initialImageUri !== imageUri) {
            setImageUri(initialImageUri);
        }
    }, [initialImageUri, imageUri]);

    useEffect(() => {
        if (imageUri && imageUri !== initialImageUri) {
            onImageChange(imageUri);
        }
    }, [imageUri, initialImageUri, onImageChange]);

    const { fileUpload, fileUploading, error: uploadError, pctComplete, }
        = useFileUpload({ setImageUri, setPreviewSrc, setPreviewUri, setAnimationUri, setMimeType, animationUri });

    const handleCroppedImage = (url: string, uri: string) => {
        setPreviewSrc(url);
        setPreviewUri(uri);
        onImageChange(uri);
    }

    const handleFileUpload = async (event: any) => {
        await fileUpload(event);
    };

    const openCropModal = () => {
        setShowCropModal(true);
    };

    const closeCropModal = () => {
        setShowCropModal(false);
    }

    const currentImageUri = previewSrc || previewUri || imageUri;

    return (
        <div>
            <label className="font-archivo text-sm text-grey-moss-600 block mb-1">
                image
            </label>
            <div className="space-y-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                />

                <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || fileUploading}
                    variant="outline"
                    className="w-full"
                >
                    {fileUploading ? `Uploading... ${pctComplete}%` : "Upload Image"}
                </Button>

                {uploadError && (
                    <p className="text-xs text-red-500">{uploadError}</p>
                )}

                <PreviewImage currentImageUri={currentImageUri} previewSrc={previewSrc} openCropModal={openCropModal} disabled={disabled} />

                {
                    showCropModal && <CropImage previewSrc={previewSrc} imageUri={imageUri} closeModal={closeCropModal} handleCroppedImage={handleCroppedImage} />
                }

            </div>
        </div>
    );
};

export default ImageUpload;
