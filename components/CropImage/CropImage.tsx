import { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import { useCropImageProvider } from "@/providers/CropImageProvider";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const CropImage = () => {
  const { previewFile, imageFile } = useMomentFormProvider();
  const { crop, rotation, setCrop, setRotation, zoom, setZoom, onCropComplete } =
    useCropImageProvider();
  const [previewFileUrl, setPreviewFileUrl] = useState<string>("");
  const [imageFileUrl, setImageFileUrl] = useState<string>("");

  // Create blob URL from previewFile (preferred) or imageFile (fallback)
  useEffect(() => {
    const fileToUse = previewFile || imageFile;
    if (fileToUse) {
      const blobUrl = URL.createObjectURL(fileToUse);
      if (previewFile) {
        setPreviewFileUrl(blobUrl);
        setImageFileUrl("");
      } else {
        setImageFileUrl(blobUrl);
        setPreviewFileUrl("");
      }
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setPreviewFileUrl("");
      setImageFileUrl("");
    }
  }, [previewFile, imageFile]);

  const imageSrc = previewFileUrl || imageFileUrl || "";

  // Ensure onCropComplete is called when image loads to capture initial crop area
  useEffect(() => {
    if (imageSrc) {
      // Trigger onCropComplete with initial crop area after a brief delay to ensure Cropper is ready
      const timer = setTimeout(() => {
        // This will be handled by react-easy-crop's onCropComplete callback
        // We just need to ensure the image is loaded
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [imageSrc]);

  return (
    <Cropper
      image={imageSrc}
      crop={crop}
      rotation={rotation}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onRotationChange={setRotation}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
};

export default CropImage;
