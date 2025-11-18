import Cropper from "react-easy-crop";
import { useCropImageProvider } from "@/providers/CropImageProvider";
import { arweaveGatewayUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";

const CropImage = () => {
  const { previewSrc, imageUri } = useMomentCreateFormProvider();
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
  const imageSrc = hasUploadedSelectedImage ? previewSrc : arweaveGatewayUrl(imageUri) || "";

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
