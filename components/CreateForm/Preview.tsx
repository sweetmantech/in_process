import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "../ui/label";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import PreviewModal from "./PreviewModal";
import WritingPreview from "./WritingPreview";
import { Fragment, ReactNode, useState } from "react";

const PreviewContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Label>preview</Label>
      <section className="mt-1 aspect-video border border-grey relative overflow-hidden cursor-pointer font-spectral">
        {children}
      </section>
    </Fragment>
  );
};
const Preview = () => {
  const { previewUri, writingText } = useZoraCreateProvider();
  const [previewError, setPreviewError] = useState(false);
  return (
    <div>
      {previewUri && (
        <PreviewContainer>
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={getFetchableUrl(previewUri) || ""}
            alt="not found preview."
            onError={() => {
              setPreviewError(true);
            }}
            key={previewUri + previewError}
          />
        </PreviewContainer>
      )}
      {writingText && !previewUri && (
        <PreviewContainer>
          <WritingPreview />
        </PreviewContainer>
      )}
      <PreviewModal />
    </div>
  );
};

export default Preview;
