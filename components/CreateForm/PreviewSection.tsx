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
      <section className="mt-1 aspect-video border border-grey relative overflow-hidden cursor-pointer font-spectral">
        {children}
        {showProgress && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </section>
    </Fragment>
  );
};

export default PreviewSection;
