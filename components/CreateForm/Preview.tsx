import Image from "next/image";
import PreviewModal from "./PreviewModal";
import WritingPreview from "./WritingPreview";
import PreviewSection from "./PreviewSection";
import { useState, useEffect } from "react";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

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
        <PreviewSection showProgress={isUploading} uploadProgress={uploadProgress}>
          <Image
            key={previewFile ? `${previewFile.name}-${previewFile.lastModified}` : previewFileUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={previewFileUrl}
            alt="not found preview."
          />
        </PreviewSection>
      )}
      {showWritingPreview && (
        <PreviewSection showProgress={isUploading} uploadProgress={uploadProgress}>
          <WritingPreview />
        </PreviewSection>
      )}
      {hasSelectedFile && <PreviewModal />}
    </div>
  );
};

export default Preview;
