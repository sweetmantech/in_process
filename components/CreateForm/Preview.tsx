import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "../ui/label";
import ImagePreview from "./ImagePreview";
import RepositionModal from "./RepositionModal";
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
  const { previewUri, writingText, previewSrc, setIsOpenPreviewUpload } = useZoraCreateProvider();
  return (
    <div>
      {previewUri && (
        <>
                                   <PreviewContainer>
                           <ImagePreview
                             src={previewSrc}
                             alt="not found preview."
                           />
                         </PreviewContainer>
          <button
            type="button"
            className="mt-2 w-full py-2 font-archivo rounded-sm border border-grey-moss-900 
            hover:border-grey-moss-300 hover:text-grey-eggshell hover:bg-grey-moss-300
            transform transition-transform duration-150"
            onClick={() => setIsOpenPreviewUpload(true)}
          >
            set preview
          </button>
        </>
      )}
      {writingText && !previewUri && (
        <PreviewContainer>
          <WritingPreview />
        </PreviewContainer>
      )}
      <RepositionModal />
    </div>
  );
};

export default Preview;
