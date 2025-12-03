import AudioPlayer from "./AudioPlayer";
import Image from "next/image";
import React, { Fragment } from "react";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
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
  const { mimeType, previewFileUrl, animationFileUrl } = useMomentFormProvider();

  // For PDFs: use blob URL if file exists, otherwise use uploaded URI
  if (mimeType.includes("pdf")) {
    return (
      <Container>
        <PdfViewer fileUrl={animationFileUrl} />
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

  if (mimeType.includes("video")) {
    return (
      <Container>
        <VideoPlayer url={animationFileUrl} />
      </Container>
    );
  }

  // For images: use previewFileUrl (blob URL from previewFile)
  if (previewFileUrl) {
    return (
      <div className="size-full cursor-pointer">
        <Image
          src={previewFileUrl}
          alt="Image Preview"
          onClick={handleImageClick}
          blurDataURL={previewFileUrl}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
    );
  }

  return <Fragment />;
};

export default MediaUploaded;
