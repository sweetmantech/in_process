import AudioPlayer from "../Renderers/AudioPlayer";
import Image from "next/image";
import React, { Fragment } from "react";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import Container from "./Container";
import UploadProgressOverlay from "./UploadProgressOverlay";

interface PreviewContainerProps {
  handleImageClick: () => void;
}

/**
 * PreviewContainer - Displays preview of blob files during moment creation phase.
 * This component ONLY handles preview of blob files before upload.
 * It does NOT handle metadata display after creation.
 */
const PreviewContainer = ({ handleImageClick }: PreviewContainerProps) => {
  const { mimeType, imageFile, isUploading, uploadProgress, blobUrls } = useMetadataFormProvider();

  // For images: check first (most common case) - use imageFile blob URL only
  if (imageFile && blobUrls.image) {
    return (
      <div className="relative size-full cursor-pointer">
        <Image
          src={blobUrls.image}
          alt="Image Preview"
          onClick={handleImageClick}
          blurDataURL={blobUrls.image}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
        {isUploading && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </div>
    );
  }

  if (blobUrls.pdf) {
    return (
      <Container className="relative">
        <PdfViewer fileUrl={blobUrls.pdf} />
        {isUploading && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </Container>
    );
  }

  if (mimeType.includes("audio") && blobUrls.audio) {
    return (
      <Container className="relative">
        <AudioPlayer audioUrl={blobUrls.audio} />
        {isUploading && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </Container>
    );
  }

  if (mimeType.includes("video") && blobUrls.video) {
    return (
      <Container className="relative">
        <VideoPlayer url={blobUrls.video} />
        {isUploading && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </Container>
    );
  }

  return <Fragment />;
};

export default PreviewContainer;
