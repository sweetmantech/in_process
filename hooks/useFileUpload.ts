import { useState, useEffect, useCallback } from "react";
import useMuxUpload from "./useMuxUpload";
import useMuxUploadCallback from "./useMuxUploadCallback";
import { validateFile } from "@/lib/fileUpload/validateFile";
import { handleVideoUpload } from "@/lib/fileUpload/handleVideoUpload";
import { handleImageUpload } from "@/lib/fileUpload/handleImageUpload";
import { handleOtherFileUpload } from "@/lib/fileUpload/handleOtherFileUpload";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const useFileUpload = () => {
  const { setImageUri, setPreviewUri, setPreviewSrc, setAnimationUri, setMimeType, animationUri } =
    useMomentFormProvider();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pctComplete, setPctComplete] = useState<number>(0);
  const [pendingVideoFile, setPendingVideoFile] = useState<File | null>(null);
  const muxUpload = useMuxUpload();

  const { processedVideoRef } = useMuxUploadCallback({
    pendingVideoFile,
    setPendingVideoFile,
    setLoading,
    setPctComplete,
    muxUpload,
  });

  // Sync Mux upload errors
  useEffect(() => {
    if (muxUpload.error) {
      setError(muxUpload.error);
      setLoading(false);
      setPendingVideoFile(null);
    }
  }, [muxUpload.error]);

  const fileUpload = useCallback(
    async (event: any) => {
      setPctComplete(0);
      setError("");
      setLoading(true);
      processedVideoRef.current = null; // Reset processed video ref for new upload

      try {
        const file: File = event.target.files[0];
        if (!validateFile(file)) {
          setLoading(false);
          return;
        }

        const mimeType = file.type;
        const isImage = mimeType.includes("image");
        const isVideo = mimeType.includes("video");

        // Route videos to Mux, everything else to Arweave
        if (isVideo) {
          await handleVideoUpload(file, {
            setPendingVideoFile,
            setImageUri,
            setPreviewSrc,
            setPreviewUri,
            setMimeType,
            muxUpload,
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
        setPendingVideoFile(null);
      }
    },
    [
      muxUpload,
      setImageUri,
      setPreviewSrc,
      setPreviewUri,
      setAnimationUri,
      setMimeType,
      animationUri,
    ]
  );

  return {
    fileUpload,
    fileUploading: loading || muxUpload.uploading,
    error,
    setFileUploading: setLoading,
    pctComplete: muxUpload.uploading ? muxUpload.pctComplete : pctComplete,
  };
};

export default useFileUpload;
