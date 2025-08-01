import { useState, useCallback } from 'react';
import { ChangeEvent } from 'react';
import clientUploadToArweave from '@/lib/arweave/clientUploadToArweave';
import { toast } from 'sonner';

interface UseFileUploadProps {
  setPreviewSrc: (src: string) => void;
  setPreviewUri: (uri: string) => void;
}

interface UseFileUploadReturn {
  progress: number;
  isUploading: boolean;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const useFileUpload = ({ 
  setPreviewSrc, 
  setPreviewUri 
}: UseFileUploadProps): UseFileUploadReturn => {
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = e.target.files;
    if (!files?.length) return;
    
    const file = files[0];
    if (!file.type.includes("image")) {
      toast.error("please, select only image file.");
      return;
    }
    
    try {
      const previewUri = await clientUploadToArweave(file, (value: number) =>
        setProgress(value),
      );
      setPreviewSrc(URL.createObjectURL(file));
      setPreviewUri(previewUri);
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  }, [setPreviewSrc, setPreviewUri]);

  return {
    progress,
    isUploading,
    handleFileUpload,
  };
};
