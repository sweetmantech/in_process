import Cropper from "react-easy-crop";
import { useCropImageProvider } from "@/providers/CropImageProvider";
import { useImageLoadDelay } from "@/hooks/useImageLoadDelay";

const CropImage = () => {
  const { crop, rotation, setCrop, setRotation, zoom, setZoom, onCropComplete, imageSrc } =
    useCropImageProvider();
  useImageLoadDelay(imageSrc);

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
