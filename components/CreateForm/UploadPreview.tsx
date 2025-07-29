import { Fragment } from "react";
import { ChangeEvent, useRef, useState } from "react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import ImagePreview from "./ImagePreview";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { toast } from "sonner";
import WritingPreview from "./WritingPreview";
import { Label } from "../ui/label";

const UploadPreview = () => {
  const {
    previewUri,
    setPreviewUri,
    writingText,
    setIsOpenPreviewUpload,
    previewSrc,
    setPreviewSrc,
  } = useZoraCreateProvider();
  const [progress, setProgress] = useState<number>(0);
  const previewRef = useRef() as any;
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
      setProgress(value),
    );
    setPreviewSrc(URL.createObjectURL(file));
    setPreviewUri(previewUri);
    setIsUploading(false);
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
      <div className="w-full aspect-video relative border border-grey mt-2 font-spectral overflow-hidden">
                               {previewUri && !isUploading ? (
                         <ImagePreview
                           src={previewSrc}
                           alt="not found preview."
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
        type="button"
        className="w-full mt-2 py-2 font-archivo rounded-sm border border-grey-moss-900 
        hover:border-grey-moss-300 hover:text-grey-eggshell hover:bg-grey-moss-300
        transform transition-transform duration-150"
        onClick={() => setIsOpenPreviewUpload(true)}
      >
        set preview
      </button>
      <button
        type="button"
        className="border border-grey-moss-900 w-full mt-2 py-2 font-archivo rounded-sm 
        hover:border-grey-moss-300 hover:text-grey-eggshell hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
        onClick={handleClick}
      >
        upload thumbnail
      </button>
      <button
        type="button"
        className="w-full mt-2 py-2 font-archivo rounded-sm bg-grey-moss-900 text-grey-eggshell
        hover:border-grey-moss-300 hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
        onClick={() => setIsOpenPreviewUpload(false)}
      >
        done
      </button>
    </Fragment>
  );
};

export default UploadPreview;
