import { useState, useEffect } from "react";
import { Area } from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage/getCroppedImage";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

interface UseCropImageReturn {
  crop: { x: number; y: number };
  setCrop: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onCropComplete: (_: Area, cropped: Area) => void;
  saveCroppedImage: () => Promise<void>;
  isUploading: boolean;
  hasUploadedSelectedImage: boolean;
  setHasUploadedSelectedImage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useCropImage(): UseCropImageReturn {
  const { setPreviewFile, previewFile, imageFile } = useMomentFormProvider();
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [hasUploadedSelectedImage, setHasUploadedSelectedImage] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  // Create blob URL from previewFile (cropped) or imageFile (original)
  useEffect(() => {
    const fileToUse = previewFile || imageFile;
    if (fileToUse && hasUploadedSelectedImage) {
      const blobUrl = URL.createObjectURL(fileToUse);
      setImageSrc(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setImageSrc("");
    }
  }, [previewFile, imageFile, hasUploadedSelectedImage]);

  const onCropComplete = (_: Area, cropped: Area) => {
    setCroppedAreaPixels(cropped);
  };

  const saveCroppedImage = async () => {
    if (!croppedAreaPixels || isUploading || !imageSrc) return;

    try {
      setIsUploading(true);
      const resultUrl = (await getCroppedImg(imageSrc, croppedAreaPixels, rotation)) as string;

      const response = await fetch(resultUrl);
      const blob = await response.blob();
      const file = new File([blob], "preview.jpeg", {
        type: blob.type || "image/jpeg",
      });

      setPreviewFile(file);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    crop,
    setCrop,
    rotation,
    setRotation,
    zoom,
    setZoom,
    onCropComplete,
    saveCroppedImage,
    isUploading,
    hasUploadedSelectedImage,
    setHasUploadedSelectedImage,
  };
}
