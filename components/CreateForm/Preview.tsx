import { Label } from "../ui/label";
import Image from "next/image";
import PreviewModal from "./PreviewModal";
import WritingPreview from "./WritingPreview";
import { Fragment, ReactNode, useState, useEffect } from "react";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const PreviewContainer = ({
  children,
  showProgress,
  uploadProgress,
}: {
  children: ReactNode;
  showProgress?: boolean;
  uploadProgress?: number;
}) => {
  return (
    <Fragment>
      <Label>preview</Label>
      <section className="mt-1 aspect-video border border-grey relative overflow-hidden cursor-pointer font-spectral">
        {children}
        {showProgress && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
            <div className="text-white font-archivo-medium text-lg mb-2">
              Uploading to Arweave...
            </div>
            <div className="w-3/4 bg-grey-moss-300 rounded-full h-2 overflow-hidden">
              <div
                className="bg-grey-moss-900 h-full transition-all duration-300"
                style={{ width: `${uploadProgress || 0}%` }}
              />
            </div>
            <div className="text-white font-spectral text-sm mt-2">
              {Math.round(uploadProgress || 0)}%
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};
const Preview = () => {
  const {
    writingText,
    previewFile,
    videoFile,
    animationFile,
    imageFile,
    isUploading,
    uploadProgress,
  } = useMomentFormProvider();
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
        <PreviewContainer showProgress={isUploading} uploadProgress={uploadProgress}>
          <Image
            key={previewFile ? `${previewFile.name}-${previewFile.lastModified}` : previewFileUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={previewFileUrl}
            alt="not found preview."
          />
        </PreviewContainer>
      )}
      {showWritingPreview && (
        <PreviewContainer showProgress={isUploading} uploadProgress={uploadProgress}>
          <WritingPreview />
        </PreviewContainer>
      )}
      {hasSelectedFile && <PreviewModal />}
    </div>
  );
};

export default Preview;
