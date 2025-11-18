import { useState, useCallback } from "react";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { validateFile } from "@/lib/fileUpload/validateFile";
import { handleVideoUpload } from "@/lib/fileUpload/handleVideoUpload";
import { handleImageUpload } from "@/lib/fileUpload/handleImageUpload";
import { handleOtherFileUpload } from "@/lib/fileUpload/handleOtherFileUpload";

const useFileUpload = () => {
  const { setImageUri, setPreviewUri, setPreviewSrc, setAnimationUri, setMimeType, animationUri } =
    useMomentFormProvider();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pctComplete, setPctComplete] = useState<number>(0);

  const fileUpload = useCallback(
    async (event: any) => {
      setPctComplete(0);
      setError("");
      setLoading(true);

      try {
        const file: File = event.target.files[0];
        if (!validateFile(file)) {
          setLoading(false);
          return;
        }

        const mimeType = file.type;
        const isImage = mimeType.includes("image");
        const isVideo = mimeType.includes("video");

        if (isVideo) {
          await handleVideoUpload(file, {
            setImageUri,
            setPreviewSrc,
            setPreviewUri,
            setAnimationUri,
            setMimeType,
            setLoading,
            setPctComplete,
          });
        } else if (isImage) {
          await handleImageUpload(file, {
            setImageUri,
            setPreviewSrc,
            setPreviewUri,
            setMimeType,
            setLoading,
            setPctComplete,
            animationUri,
          });
        } else {
          await handleOtherFileUpload(file, {
            setAnimationUri,
            setMimeType,
            setLoading,
            setPctComplete,
          });
        }
      } catch (err: unknown) {
        console.error(err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to upload the file. Please try again.";
        setError(errorMessage);
        setLoading(false);
      }
    },
    [setImageUri, setPreviewSrc, setPreviewUri, setAnimationUri, setMimeType, animationUri]
  );

  return {
    fileUpload,
    fileUploading: loading,
    error,
    setFileUploading: setLoading,
    pctComplete,
  };
};

export default useFileUpload;
