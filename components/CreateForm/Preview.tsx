import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import PreviewModal from "./PreviewModal";
import WritingPreview from "./WritingPreview";
import { PreviewContainer } from "./PreviewContainer";
import { PreviewImage } from "./PreviewImage";
import { usePreviewValidation } from "@/hooks/usePreviewValidation";

const Preview = () => {
  const { previewUri, writingText, previewSrc, imageScale, imageOffset } = useZoraCreateProvider();
  
  // Use the extracted validation hook
  const { validatedTransform } = usePreviewValidation({
    scale: imageScale,
    offset: imageOffset,
  });

  return (
    <div>
      {previewUri && (
        <PreviewContainer>
          <PreviewImage 
            src={previewSrc} 
            transform={validatedTransform}
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
