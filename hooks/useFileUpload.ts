import { MAX_FILE_SIZE, ONE_MB } from "@/lib/consts";
import { uploadFile } from "@/lib/arweave/uploadFile";
import { Dispatch, SetStateAction, useState } from "react";
import captureFirstImageFroVideo from "@/lib/captureImageFromVideo";
import base64ToFile from "@/lib/base64ToFile";

interface useFileUploadProps {
  setName: Dispatch<SetStateAction<string>>;
  setImageUri: Dispatch<SetStateAction<string>>;
  setAnimationUri: Dispatch<SetStateAction<string>>;
  setMimeType: Dispatch<SetStateAction<string>>;
  animationUri: string;
}

const useFileUpload = ({
  setName,
  setImageUri,
  setAnimationUri,
  setMimeType,
  animationUri,
}: useFileUploadProps) => {
  const [blurImageUrl, setBlurImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fileUpload = async (event: any) => {
    setError("");
    setLoading(true);

    try {
      const file: File = event.target.files[0];
      if (!file) {
        throw new Error();
      }
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(
          `File size exceeds the maximum limit of ${MAX_FILE_SIZE / ONE_MB}MB.`,
        );
      }

      const mimeType = file.type;
      const isImage = mimeType.includes("image");

      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      setName(fileNameWithoutExtension);

      const uri = await uploadFile(file);
      if (isImage) {
        setImageUri(uri);
        setBlurImageUrl(URL.createObjectURL(file));
        if (!animationUri) {
          setMimeType(mimeType);
        }
      } else {
        const frameBase64: any = await captureFirstImageFroVideo(
          URL.createObjectURL(file),
        );
        const imageFile = base64ToFile(frameBase64 as string, file.name);
        const imageUri = await uploadFile(imageFile);
        setAnimationUri(uri);
        setImageUri(imageUri);
        setMimeType(mimeType);
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
    blurImageUrl,
    setFileUploading: setLoading,
  };
};

export default useFileUpload;
