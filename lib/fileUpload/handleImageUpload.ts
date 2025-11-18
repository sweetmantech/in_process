import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

export interface ImageUploadHandlers {
  setImageUri: (uri: string) => void;
  setPreviewSrc: (src: string) => void;
  setPreviewUri: (uri: string) => void;
  setMimeType: (mimeType: string) => void;
  setLoading: (loading: boolean) => void;
  setPctComplete: (pct: number) => void;
  animationUri: string | null;
}

export const handleImageUpload = async (
  file: File,
  handlers: ImageUploadHandlers
): Promise<void> => {
  try {
    const uri = await clientUploadToArweave(file, (pct: number) => handlers.setPctComplete(pct));

    handlers.setImageUri(uri);
    handlers.setPreviewSrc(URL.createObjectURL(file));
    handlers.setPreviewUri(uri);

    if (!handlers.animationUri) {
      handlers.setMimeType(file.type);
    }
  } finally {
    handlers.setLoading(false);
  }
};
