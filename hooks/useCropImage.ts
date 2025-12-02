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
}

export default function useCropImage(): UseCropImageReturn {
  const { setPreviewFile, previewFile, imageFile } = useMomentFormProvider();
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  // Create blob URL from previewFile (cropped) or imageFile (original)
  useEffect(() => {
    const fileToUse = previewFile || imageFile;
    if (fileToUse) {
      const blobUrl = URL.createObjectURL(fileToUse);
      setImageSrc(blobUrl);
      // Reset crop state when image changes
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setCroppedAreaPixels(null);
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setImageSrc("");
      setCroppedAreaPixels(null);
    }
  }, [previewFile, imageFile]);

  const onCropComplete = (_: Area, cropped: Area) => {
    setCroppedAreaPixels(cropped);
  };

  const saveCroppedImage = async () => {
    if (!imageSrc) {
      console.error("saveCroppedImage: imageSrc is empty");
      return;
    }
    if (isUploading) {
      console.error("saveCroppedImage: already uploading");
      return;
    }
    if (!croppedAreaPixels) {
      console.error("saveCroppedImage: croppedAreaPixels is null - crop the image first");
      return;
    }

    try {
      setIsUploading(true);
      const resultUrl = (await getCroppedImg(imageSrc, croppedAreaPixels, rotation)) as string;

      if (!resultUrl) {
        throw new Error("Failed to generate cropped image");
      }

      const response = await fetch(resultUrl);
      const blob = await response.blob();
      // Add timestamp to filename to ensure React detects the File change
      const timestamp = Date.now();
      const file = new File([blob], `preview-${timestamp}.jpeg`, {
        type: blob.type || "image/jpeg",
        lastModified: timestamp,
      });

      setPreviewFile(file);
    } catch (err) {
      console.error("Error saving cropped image:", err);
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
  };
}
