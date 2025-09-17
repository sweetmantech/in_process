"use client";
import { Button } from "@/components/ui/button";

interface PreviewImageProps {
    currentImageUri?: string;
    previewSrc?: string;
    disabled: boolean;
    openCropModal: () => void;
}

const PreviewImage = ({ currentImageUri, previewSrc, disabled, openCropModal }: PreviewImageProps) => {
    return (
        <div className="space-y-2">
            <div className="relative">
                {
                    currentImageUri && <img
                        src={currentImageUri}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-md border"
                    />
                }
                {previewSrc && (
                    <div className="w-full flex items-center justify-center absolute left-0 bottom-5 ">
                        <Button
                            onClick={openCropModal}
                            disabled={disabled}
                            variant="outline"
                            size="sm"
                            className="w-2/4 bg-grey-moss-300 hover:bg-grey text-grey-eggshell"
                        >
                            Crop Image
                        </Button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default PreviewImage;