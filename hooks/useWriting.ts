import { uploadWritingFile } from "@/lib/arweave/uploadWritingFile";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const useWriting = () => {
  const { writingText } = useMetadataFormProvider();
  const uploadWriting = async () => {
    const uri = await uploadWritingFile(writingText);
    return uri;
  };
  return {
    uploadWriting,
  };
};

export default useWriting;
