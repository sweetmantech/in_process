import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import useCropImage from "@/hooks/useCropImage";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { arweaveGatewayUrl } from "@/lib/protocolSdk/ipfs/gateway";

const CropImage = () => {
  const { imageUri } = useZoraCreateProvider();
  const {
    crop,
    setCrop,
    rotation,
    setRotation,
    zoom,
    setZoom,
    onCropComplete,
    saveCroppedImage,
    isUploading,
  } = useCropImage();
  const imageSrc = arweaveGatewayUrl(imageUri) || "";

  return (
    <div className="flex flex-col items-center h-[500px]">
      <div className="relative w-full h-[400px] w-[400px]">
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
