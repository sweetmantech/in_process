import { uploadWritingFile } from "@/lib/arweave/uploadWritingFile";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const useWriting = () => {
  const { writingText } = useMomentFormProvider();
  const uploadWriting = async () => {
    const uri = await uploadWritingFile(writingText);
    return uri;
  };
  return {
    uploadWriting,
  };
};

export default useWriting;
