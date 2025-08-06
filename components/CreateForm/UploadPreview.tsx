import { Fragment } from "react";
import { ChangeEvent, useRef, useState } from "react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { toast } from "sonner";
import WritingPreview from "./WritingPreview";
import { Label } from "../ui/label";
import { arweaveGatewayUrl } from "@/lib/protocolSdk/ipfs/gateway";
import useCropImage from "@/hooks/useCropImage";
import Cropper from "react-easy-crop";

const UploadPreview = () => {
  const {
    previewUri,
    setPreviewUri,
    writingText,
    setIsEditingPreview,
    setIsOpenPreviewUpload,
    imageUri,
    setPreviewSrc,
    previewSrc,
  } = useZoraCreateProvider();
  const [progress, setProgress] = useState<number>(0);
  const previewRef = useRef() as any;
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);
  const imageSrc = hasUploaded ? previewSrc : arweaveGatewayUrl(imageUri) || "";
  const {
    crop,
    setCrop,
    rotation,
    setRotation,
    zoom,
    setZoom,
    onCropComplete,
    saveCroppedImage,
    isUploading: isUploadingCrop,
  } = useCropImage(hasUploaded ? previewSrc : imageSrc);

  const handleClick = () => {
    if (!previewRef.current) return;
    previewRef.current.click();
  };

  const handlePreviewUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = e.target.files;
    if (!files?.length) return;
    const file = files[0];
    if (!file.type.includes("image")) {
      toast.error("please, select only image file.");
      return;
    }
    const previewUri = await clientUploadToArweave(file, (value: number) =>
      setProgress(value)
    );
    setPreviewSrc(URL.createObjectURL(file));
    setPreviewUri(previewUri);
    setIsUploading(false);
    setHasUploaded(true);
  };

  const handleDoneClick = async () => {
    await saveCroppedImage();
    setIsOpenPreviewUpload(false);
  };

  return (
    <Fragment>
      <Label className="font-archivo-medium text-2xl text-center w-full">
        Preview
      </Label>
      <input
        type="file"
        className="hidden"
        ref={previewRef}
        accept="image/*"
        onChange={handlePreviewUpload}
      />
      <div className="w-3/4 aspect-video relative border border-grey mt-2 font-spectral overflow-hidden">
        {previewUri && !isUploading ? (
          <Cropper
            image={hasUploaded ? previewSrc : imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        ) : (
          <>
            {writingText && !isUploading ? (
              <WritingPreview />
            ) : (
              <div className="size-full p-3 flex justify-center items-center">
                <p className="font-spectral text-3xl">
                  {isUploading ? `${progress} %` : "No Preview."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <button
        className="font-spectral-italic cursor-pointer"
        type="button"
        onClick={() => setIsEditingPreview(true)}
      >
        click to resize
      </button>
      <button
        type="button"
        className="border border-grey-moss-900 w-3/4 mt-2 py-2 font-archivo rounded-sm 
        hover:border-grey-moss-300 hover:text-grey-eggshell hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
        onClick={handleClick}
      >
        upload thumbnail
      </button>
      <button
        type="button"
        className="w-3/4 mt-2 py-2 font-archivo rounded-sm bg-grey-moss-900 text-grey-eggshell
        hover:border-grey-moss-300 hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
        onClick={handleDoneClick}
        disabled={isUploadingCrop}
      >
        {isUploadingCrop ? "saving..." : "done"}
      </button>
    </Fragment>
  );
};

export default UploadPreview;
