import { Label } from "../ui/label";
import { Fragment, ReactNode } from "react";
import UploadProgressOverlay from "../MetadataCreation/UploadProgressOverlay";

interface PreviewSectionProps {
  children: ReactNode;
  showProgress?: boolean;
  uploadProgress?: number;
}

const PreviewSection = ({ children, showProgress, uploadProgress }: PreviewSectionProps) => {
  return (
    <Fragment>
      <Label>preview</Label>
      <section className="relative mt-1 aspect-video cursor-pointer overflow-hidden border border-grey font-spectral">
        {children}
        {showProgress && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </section>
    </Fragment>
  );
};

export default PreviewSection;
