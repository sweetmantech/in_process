import AudioPlayer from "./AudioPlayer";
import Image from "next/image";
import React, { Fragment } from "react";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { usePreviewBlobUrls } from "@/hooks/usePreviewBlobUrls";

interface PreviewContainerProps {
  handleImageClick: () => void;
}

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`size-full flex justify-center ${className}`}>{children}</div>;

/**
 * PreviewContainer - Displays preview of blob files during moment creation phase.
 * This component ONLY handles preview of blob files before upload.
 * It does NOT handle metadata display after creation.
 */
const PreviewContainer = ({ handleImageClick }: PreviewContainerProps) => {
  const { mimeType, imageFile } = useMomentFormProvider();

  const blobUrls = usePreviewBlobUrls();

  // For images: check first (most common case) - use imageFile blob URL only
  if (imageFile && blobUrls.image) {
    return (
      <div className="size-full cursor-pointer">
        <Image
          src={blobUrls.image}
          alt="Image Preview"
          onClick={handleImageClick}
          blurDataURL={blobUrls.image}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
    );
  }

  if (blobUrls.pdf) {
    return (
      <Container>
        <PdfViewer fileUrl={blobUrls.pdf} />
      </Container>
    );
  }

  if (mimeType.includes("audio")) {
    return (
      <Container>
        <AudioPlayer onClick={handleImageClick} />
      </Container>
    );
  }

  if (mimeType.includes("video") && blobUrls.video) {
    return (
      <Container>
        <VideoPlayer url={blobUrls.video} />
      </Container>
    );
  }

  return <Fragment />;
};

export default PreviewContainer;
