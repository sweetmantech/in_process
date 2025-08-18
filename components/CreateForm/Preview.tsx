import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "../ui/label";
import Image from "next/image";
import PreviewModal from "./PreviewModal";
import WritingPreview from "./WritingPreview";
import { Fragment, ReactNode } from "react";

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
  const { previewUri, writingText, previewSrc, animationUri } =
    useZoraCreateProvider();
  const showPreview = previewUri || animationUri;
  const showWritingPreview = writingText && !previewUri;
  const showImagePreview = showPreview && !showWritingPreview;
  return (
    <div>
      {showImagePreview && (
        <PreviewContainer>
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={previewSrc || "/bg-gray.png"}
            alt="not found preview."
          />
        </PreviewContainer>
      )}
      {showWritingPreview && (
        <PreviewContainer>
          <WritingPreview />
        </PreviewContainer>
      )}
      {showPreview && <PreviewModal />}
    </div>
  );
};

export default Preview;
