import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/lib/cropImage/getCroppedImage";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { arweaveGatewayUrl } from "@/lib/protocolSdk/ipfs/gateway";

// imageUri will be pulled from context; no hard-coded fallback

const CropImage = () => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  // internal state no longer keeps local preview URL; upload handled directly
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Zora create context
  const { setPreviewUri, setPreviewSrc, setIsEditingPreview, imageUri } =
    useZoraCreateProvider();
  console.log("imageUri", imageUri);
  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveCroppedImage = async () => {
    if (!croppedAreaPixels || isUploading || !imageUri) return;

    try {
      setIsUploading(true);

      // Get cropped image as object URL string
      const resultUrl = (await getCroppedImg(
        arweaveGatewayUrl(imageUri) || "",
        croppedAreaPixels,
        rotation
      )) as string;

      // Convert object URL to Blob
      const response = await fetch(resultUrl);
      const blob = await response.blob();

      const file = new File([blob], "preview.jpeg", {
        type: blob.type || "image/jpeg",
      });

      // Upload to Arweave
      const uri = await clientUploadToArweave(file);

      // Update global state for preview
      setPreviewSrc(resultUrl);
      setPreviewUri(uri);

      // Exit editing mode
      setIsEditingPreview(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-[500px]">
      {/* Cropper wrapper has its own height so the crop overlay doesn't cover the button */}
      <div className="relative w-full h-[400px] w-[400px]">
        <Cropper
          image={arweaveGatewayUrl(imageUri) || ""}
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
      <div className="flex justify-center pt-4 z-10">
        <Button onClick={saveCroppedImage} disabled={isUploading}>
          {isUploading ? "Saving…" : "Save Result"}
        </Button>
      </div>
    </div>
  );
};

export default CropImage;
