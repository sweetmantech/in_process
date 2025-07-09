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
      <section className="mt-1 max-h-96 border border-grey relative overflow-hidden cursor-pointer font-spectral flex justify-center items-center">
        {children}
      </section>
    </Fragment>
  );
};
const Preview = () => {
  const { previewUri, writingText, previewSrc } = useZoraCreateProvider();
  return (
    <div>
      {previewUri && (
        <PreviewContainer>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            src={previewSrc}
            alt="not found preview."
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
