import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import ImgDialog from "./ImgDialog";
import getCroppedImg from "@/lib/cropImage/getCroppedImage";

const dogImg =
  "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";

const CropImage = () => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    if (!croppedAreaPixels) return;
    try {
      const result = (await getCroppedImg(
        dogImg,
        croppedAreaPixels,
        rotation
      )) as string;
      console.log("sweets result", result);
      setCroppedImage(result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center h-[500px]">
      {/* Cropper wrapper has its own height so the crop overlay doesn't cover the button */}
      <div className="relative w-full h-[400px] w-[400px]">
        <Cropper
          image={dogImg}
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
        <Button onClick={showCroppedImage}>Save Result</Button>
      </div>
      <ImgDialog img={croppedImage || ""} />
    </div>
  );
};

export default CropImage;
