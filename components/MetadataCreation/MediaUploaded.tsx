import AudioPlayer from "./AudioPlayer";
import Image from "next/image";
import React, { Fragment } from "react";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import UploadProgressOverlay from "./UploadProgressOverlay";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

interface MediaUploadedProps {
  handleImageClick: () => void;
}
const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`size-full flex justify-center ${className}`}>{children}</div>;

const MediaUploaded = ({ handleImageClick }: MediaUploadedProps) => {
  const { mimeType, previewFileUrl, animationFileUrl, isUploading, uploadProgress } =
    useMomentFormProvider();

  // For PDFs: use blob URL if file exists, otherwise use uploaded URI
  if (mimeType.includes("pdf")) {
    return (
      <Container className="relative">
        <PdfViewer fileUrl={animationFileUrl} />
        {isUploading && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </Container>
    );
  }

  if (mimeType.includes("audio")) {
    return (
      <Container className="relative">
        <AudioPlayer onClick={handleImageClick} />
        {isUploading && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </Container>
    );
  }

  if (mimeType.includes("video")) {
    if (!animationFileUrl) {
      return <Fragment />;
    }
    return (
      <Container className="relative">
        <VideoPlayer url={animationFileUrl} />
        {isUploading && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </Container>
    );
  }

  // For images: use previewFileUrl (blob URL from previewFile)
  if (previewFileUrl) {
    return (
      <div className="size-full cursor-pointer relative">
        <Image
          src={previewFileUrl}
          alt="Image Preview"
          onClick={handleImageClick}
          blurDataURL={previewFileUrl}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
        {isUploading && <UploadProgressOverlay uploadProgress={uploadProgress} />}
      </div>
    );
  }

  return <Fragment />;
};

export default MediaUploaded;
