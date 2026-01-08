import { Label } from "../ui/label";
import { Fragment, ReactNode } from "react";
import UploadProgressOverlay from "../MetadataCreation/UploadProgressOverlay";

interface PreviewSectionProps {
  children: ReactNode;
  showProgress?: boolean;
  uploadProgress?: number;
  aspectRatio?: number | null;
}

const PreviewSection = ({
  children,
  showProgress,
  uploadProgress,
  aspectRatio,
}: PreviewSectionProps) => {
  // Use dynamic aspect ratio if provided, otherwise fall back to aspect-video (16:9)
  const aspectRatioStyle = aspectRatio ? { aspectRatio: `${aspectRatio}` } : undefined;
  const aspectRatioClass = aspectRatio ? "" : "aspect-video";

  return (
    <Fragment>
      <Label>preview</Label>
      <section
        className={`relative mt-1 ${aspectRatioClass} cursor-pointer overflow-hidden border border-grey font-spectral`}
        style={aspectRatioStyle}
      >
        {children}
        {showProgress && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </section>
    </Fragment>
  );
};

export default PreviewSection;
