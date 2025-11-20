import { useEffect, useRef } from "react";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

interface MuxUploadReturn {
  upload: (file: File) => Promise<void>;
  uploading: boolean;
  error: string;
  pctComplete: number;
  playbackUrl: string;
  downloadUrl: string | undefined;
  assetId: string | undefined;
}

interface UseMuxUploadCallbackProps {
  pendingVideoFile: File | null;
  setPendingVideoFile: (file: File | null) => void;
  setLoading: (loading: boolean) => void;
  setPctComplete: (pct: number) => void;
  muxUpload: MuxUploadReturn;
}

const useMuxUploadCallback = ({
  pendingVideoFile,
  setPendingVideoFile,
  setLoading,
  setPctComplete,
  muxUpload,
}: UseMuxUploadCallbackProps) => {
  const { setAnimationUri, setMimeType } = useMomentFormProvider();
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

      // Set animation URI to Mux playback URL (not Arweave - video stays on Mux)
      setAnimationUri(muxUpload.playbackUrl);

      // Set mimeType for video
      setMimeType(pendingVideoFile.type);

      // Clean up
      setPendingVideoFile(null);
      setLoading(false);
    }
  }, [
    muxUpload.playbackUrl,
    muxUpload.uploading,
    pendingVideoFile,
    setAnimationUri,
    setMimeType,
    setPendingVideoFile,
    setLoading,
  ]);

  // Sync Mux upload progress
  useEffect(() => {
    if (muxUpload.uploading) {
      setPctComplete(muxUpload.pctComplete);
    }
  }, [muxUpload.pctComplete, muxUpload.uploading, setPctComplete]);

  return {
    processedVideoRef,
  };
};

export default useMuxUploadCallback;
