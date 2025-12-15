import EmbedCode from "./EmbedCode";
import LinkPreview from "./LinkPreview";
import TextCreation from "./TextCreation";
import useTypeParam from "@/hooks/useTypeParam";
import FileSelect from "./FileSelect";

const MetadataCreation = () => {
  const type = useTypeParam();
  return (
    <>
      {type === "writing" && <TextCreation />}
      {type === "link" && <LinkPreview />}
      {type === "embed" && <EmbedCode />}
      {type === "create" && <FileSelect />}
    </>
  );
};

export default MetadataCreation;
