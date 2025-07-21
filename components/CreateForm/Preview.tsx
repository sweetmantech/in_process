import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "../ui/label";
import Image from "next/image";
import PreviewModal from "./PreviewModal";
import WritingPreview from "./WritingPreview";
import { Fragment, ReactNode, useCallback } from "react";

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
  const { previewUri, writingText, previewSrc, imageScale, imageOffset } = useZoraCreateProvider();
  
  // Ensure we have valid transformation values
  const safeImageScale = typeof imageScale === 'number' ? imageScale : 1;
  const safeImageOffset = imageOffset && typeof imageOffset.x === 'number' && typeof imageOffset.y === 'number' 
    ? imageOffset 
    : { x: 0, y: 0 };
  
  // Convert offset and scale to CSS transform for the main preview
  const getImageStyle = useCallback(() => {
    const transforms = [];
    
    if (safeImageScale !== 1) {
      transforms.push(`scale(${safeImageScale})`);
    }
    
    if (safeImageOffset.x !== 0 || safeImageOffset.y !== 0) {
      transforms.push(`translate(${safeImageOffset.x}px, ${safeImageOffset.y}px)`);
    }
    
    const style = {
      transform: transforms.join(' '),
      transformOrigin: 'center',
      width: '100%',
      height: '100%',
      position: 'relative' as const
    };
    
    console.log('Preview transforms:', { safeImageScale, safeImageOffset, style });
    return style;
  }, [safeImageOffset, safeImageScale]);

  return (
    <div>
      {previewUri && (
        <PreviewContainer>
          <div style={getImageStyle()}>
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              src={previewSrc}
              alt="not found preview."
            />
          </div>
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
