import { useState, useEffect, useRef, useCallback } from "react";
import captureImageFromVideo from "@/lib/captureImageFromVideo";
import base64ToFile from "@/lib/base64ToFile";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { MAX_FILE_SIZE } from "@/lib/consts";
import { toast } from "sonner";
import useMuxUpload from "./useMuxUpload";
import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";

const useFileUpload = () => {
  const { setImageUri, setPreviewUri, setPreviewSrc, setAnimationUri, setMimeType, animationUri } =
    useMomentCreateFormProvider();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pctComplete, setPctComplete] = useState<number>(0);
  const [pendingVideoFile, setPendingVideoFile] = useState<File | null>(null);
  const muxUpload = useMuxUpload();
  const processedVideoRef = useRef<string | null>(null);

  // Handle Mux video upload completion
  useEffect(() => {
    if (pendingVideoFile && muxUpload.playbackUrl && !muxUpload.uploading) {
      // Prevent processing the same video twice
      const videoKey = `${pendingVideoFile.name}-${pendingVideoFile.size}`;
      if (processedVideoRef.current === videoKey) {
        return;
      }
      processedVideoRef.current = videoKey;

      const handleVideoUploadComplete = async () => {
        try {
          // Set animation URI to Mux playback URL
          setAnimationUri(muxUpload.playbackUrl);

          // Capture frame from video and upload to Arweave for preview
          const videoUrl = URL.createObjectURL(pendingVideoFile);
          const frameBase64: any = await captureImageFromVideo(videoUrl);
          const imageFile = base64ToFile(frameBase64 as string, pendingVideoFile.name);
          const imageUri = await clientUploadToArweave(imageFile);
          setImageUri(imageUri);
          setPreviewSrc(URL.createObjectURL(imageFile));
          setPreviewUri(imageUri);

          // Clean up
          setPendingVideoFile(null);
          setLoading(false);
        } catch (err: any) {
          console.error(err);
          setError(err.message ?? "Failed to process video preview");
          setLoading(false);
          setPendingVideoFile(null);
        }
      };

      handleVideoUploadComplete();
    }
  }, [
    muxUpload.playbackUrl,
    muxUpload.uploading,
    pendingVideoFile,
    setAnimationUri,
    setMimeType,
    setImageUri,
    setPreviewSrc,
    setPreviewUri,
  ]);

  // Sync Mux upload progress
  useEffect(() => {
    if (muxUpload.uploading) {
      setPctComplete(muxUpload.pctComplete);
    }
  }, [muxUpload.pctComplete, muxUpload.uploading]);

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
        const isVideo = mimeType.includes("video");

        // Route videos to Mux, everything else to Arweave
        if (isVideo) {
          setPendingVideoFile(file);
          await muxUpload.upload(file);
          // The useEffect will handle completion when playbackUrl is available
        } else {
          // Non-video files: upload to Arweave (existing behavior)
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
          }
          setLoading(false);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Failed to upload the file. Please try again.");
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
