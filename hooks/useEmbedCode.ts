import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const useEmbedCode = () => {
  const { setAnimationUri, embedCode } = useMomentFormProvider();

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
