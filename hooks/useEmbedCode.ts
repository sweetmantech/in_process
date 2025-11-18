import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";

const useEmbedCode = () => {
  const { setAnimationUri, embedCode } = useMomentCreateFormProvider();

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
    const uri = await clientUploadToArweave(textImage);
    setAnimationUri(uri);
    return uri;
  };

  return {
    uploadEmbedCode,
  };
};

export default useEmbedCode;
