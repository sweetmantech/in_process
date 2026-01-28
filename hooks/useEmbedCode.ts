import uploadToArweave from "@/lib/arweave/uploadToArweave";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const useEmbedCode = () => {
  const { embedCode } = useMetadataFormProvider();

  const uploadEmbedCode = async () => {
    const blob = new Blob(
      [
        `<html>
      ${embedCode}
      </html>`,
      ],
      { type: "text/html" }
    );
    const fileName = "embed";
    const fileType = "text/html";
    const textImage = new File([blob], fileName, { type: fileType });
    const uri = await uploadToArweave(textImage);
    return uri;
  };

  return {
    uploadEmbedCode,
  };
};

export default useEmbedCode;
