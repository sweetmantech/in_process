import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

export interface OtherFileUploadHandlers {
  setAnimationUri: (uri: string) => void;
  setMimeType: (mimeType: string) => void;
  setLoading: (loading: boolean) => void;
  setPctComplete: (pct: number) => void;
}

export const handleOtherFileUpload = async (
  file: File,
  handlers: OtherFileUploadHandlers
): Promise<void> => {
  const uri = await clientUploadToArweave(file, (pct: number) => handlers.setPctComplete(pct));

  handlers.setAnimationUri(uri);
  handlers.setMimeType(file.type);
  handlers.setLoading(false);
};
