import { useCallback, useState } from 'react';
import { ChangeEvent } from 'react';
import { toast } from 'sonner';
import clientUploadToArweave from '@/lib/arweave/clientUploadToArweave';

interface ImageUploadProps {
  setPreviewSrc: (src: string) => void;
  setPreviewUri: (uri: string) => void;
  setIsUploading: (uploading: boolean) => void;
}

export const useImageUpload = ({
  setPreviewSrc,
  setPreviewUri,
  setIsUploading,
}: ImageUploadProps) => {
  const [progress, setProgress] = useState<number>(0);

  const handlePreviewUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = e.target.files;
    if (!files?.length) return;
    
    const file = files[0];
    if (!file.type.includes("image")) {
      toast.error("please, select only image file.");
      setIsUploading(false);
      return;
    }
    
    try {
      const previewUri = await clientUploadToArweave(file, (value: number) =>
        setProgress(value),
      );
      setPreviewSrc(URL.createObjectURL(file));
      setPreviewUri(previewUri);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  }, [setPreviewSrc, setPreviewUri, setIsUploading]);

  return {
    progress,
    handlePreviewUpload,
  };
}; 