import { uploadWritingFile } from "@/lib/arweave/uploadWritingFile";
import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";

const useWriting = () => {
  const { writingText } = useMomentCreateFormProvider();
  const uploadWriting = async () => {
    const uri = await uploadWritingFile(writingText);
    return uri;
  };
  return {
    uploadWriting,
  };
};

export default useWriting;
