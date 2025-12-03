import Image from "next/image";
import PreviewModal from "./PreviewModal";
import WritingPreview from "./WritingPreview";
import PreviewSection from "./PreviewSection";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const Preview = () => {
  const {
    writingText,
    previewFile,
    animationFile,
    imageFile,
    isUploading,
    uploadProgress,
    previewFileUrl,
  } = useMomentFormProvider();

  // Show preview if we have selected files (blob data only - this is creation phase)
  const hasSelectedFile = previewFile || animationFile || imageFile;
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
