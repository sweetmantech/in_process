import { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import { useCropImageProvider } from "@/providers/CropImageProvider";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const CropImage = () => {
  const { previewFile, imageFile } = useMomentFormProvider();
  const {
    hasUploadedSelectedImage,
    crop,
    rotation,
    setCrop,
    setRotation,
    zoom,
    setZoom,
    onCropComplete,
  } = useCropImageProvider();
  const [previewFileUrl, setPreviewFileUrl] = useState<string>("");
  const [imageFileUrl, setImageFileUrl] = useState<string>("");

  // Create blob URL from previewFile (preferred) or imageFile (fallback)
  useEffect(() => {
    const fileToUse = previewFile || imageFile;
    if (fileToUse && hasUploadedSelectedImage) {
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
  }, [previewFile, imageFile, hasUploadedSelectedImage]);

  const imageSrc = previewFileUrl || imageFileUrl || "";

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
