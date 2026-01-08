import Image from "next/image";
import PreviewModal from "./PreviewModal";
import WritingPreview from "./WritingPreview";
import PreviewSection from "./PreviewSection";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useTypeParam from "@/hooks/useTypeParam";
import { useFileAspectRatio } from "@/hooks/useFileAspectRatio";

const Preview = () => {
  const {
    writingText,
    previewFile,
    animationFile,
    imageFile,
    isUploading,
    uploadProgress,
    previewFileUrl,
  } = useMetadataFormProvider();
  const type = useTypeParam();

  const aspectRatio = useFileAspectRatio(previewFile);

  // Show preview if we have selected files (blob data only - this is creation phase)
  const hasSelectedFile = previewFile || animationFile || imageFile;
  const showWritingPreview = writingText && !hasSelectedFile;
  const showImagePreview = hasSelectedFile && !showWritingPreview;

  return (
    <div>
      {showImagePreview && previewFileUrl && (
        <PreviewSection
          showProgress={isUploading}
          uploadProgress={uploadProgress}
          aspectRatio={aspectRatio}
        >
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
      {(hasSelectedFile || type === "link") && <PreviewModal />}
    </div>
  );
};

export default Preview;
