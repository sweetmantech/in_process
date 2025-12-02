import { Label } from "../ui/label";
import Image from "next/image";
import PreviewModal from "./PreviewModal";
import WritingPreview from "./WritingPreview";
import { Fragment, ReactNode, useState, useEffect } from "react";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

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
  const { writingText, previewFile, videoFile, animationFile, imageFile } = useMomentFormProvider();
  const [previewFileUrl, setPreviewFileUrl] = useState<string>("");

  useEffect(() => {
    if (previewFile) {
      const blobUrl = URL.createObjectURL(previewFile);
      setPreviewFileUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setPreviewFileUrl("");
    }
  }, [previewFile]);

  // Show preview if we have selected files (blob data only - this is creation phase)
  const hasSelectedFile = previewFile || videoFile || animationFile || imageFile;
  const showWritingPreview = writingText && !hasSelectedFile;
  const showImagePreview = hasSelectedFile && !showWritingPreview;

  return (
    <div>
      {showImagePreview && previewFileUrl && (
        <PreviewContainer>
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={previewFileUrl}
            alt="not found preview."
          />
        </PreviewContainer>
      )}
      {showWritingPreview && (
        <PreviewContainer>
          <WritingPreview />
        </PreviewContainer>
      )}
      {hasSelectedFile && <PreviewModal />}
    </div>
  );
};

export default Preview;
