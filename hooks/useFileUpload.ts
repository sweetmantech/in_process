import { Dispatch, SetStateAction, useState } from "react";
import captureImageFromVideo from "@/lib/captureImageFromVideo";
import base64ToFile from "@/lib/base64ToFile";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { MAX_FILE_SIZE } from "@/lib/consts";
import { toast } from "sonner";

interface useFileUploadProps {
  setImageUri: Dispatch<SetStateAction<string>>;
  setPreviewUri: Dispatch<SetStateAction<string>>;
  setPreviewSrc: Dispatch<SetStateAction<string>>;
  setAnimationUri: Dispatch<SetStateAction<string>>;
  setMimeType: Dispatch<SetStateAction<string>>;
  animationUri: string;
}

const useFileUpload = ({
  setImageUri,
  setPreviewSrc,
  setPreviewUri,
  setAnimationUri,
  setMimeType,
  animationUri,
}: useFileUploadProps) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pctComplete, setPctComplete] = useState<number>(0);

  const fileUpload = async (event: any) => {
    setPctComplete(0);
    setError("");
    setLoading(true);

    try {
      const file: File = event.target.files[0];
      if (!file) {
        throw new Error();
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error("Please select a file smaller than 222MB");
        setLoading(false);
        return;
      }

      const mimeType = file.type;
      const isImage = mimeType.includes("image");
      const uri = await clientUploadToArweave(file, (pct: number) => setPctComplete(pct));
      if (isImage) {
        setImageUri(uri);
        setPreviewSrc(URL.createObjectURL(file));
        setPreviewUri(uri);
        if (!animationUri) {
          setMimeType(mimeType);
        }
      } else {
        setAnimationUri(uri);
        setMimeType(mimeType);
        if (mimeType.includes("video")) {
          const frameBase64: any = await captureImageFromVideo(URL.createObjectURL(file));
          const imageFile = base64ToFile(frameBase64 as string, file.name);
          const imageUri = await clientUploadToArweave(imageFile);
          setImageUri(imageUri);
          setPreviewSrc(URL.createObjectURL(imageFile));
          setPreviewUri(imageUri);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Failed to upload the file. Please try again.");
    }
    setLoading(false);
  };

  return {
    fileUpload,
    fileUploading: loading,
    error,
    setFileUploading: setLoading,
    pctComplete,
  };
};

export default useFileUpload;
