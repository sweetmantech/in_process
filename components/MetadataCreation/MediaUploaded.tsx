import AudioPlayer from "./AudioPlayer";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import React, { Fragment } from "react";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import UploadSpinner from "@/components/TokenManagePage/UploadSpinner";

interface MediaUploadedProps {
  handleImageClick: () => void;
  fileUploading: boolean;
  mimeType: string;
  animationUri: string;
  imageUri: string;
  pctComplete: number;
  previewSrc: string;
}
const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`size-full flex justify-center ${className}`}>{children}</div>;

const MediaUploaded = ({
  handleImageClick,
  fileUploading,
  mimeType,
  animationUri,
  imageUri,
  pctComplete,
  previewSrc,
}: MediaUploadedProps) => {
  if (fileUploading) return <UploadSpinner pctComplete={pctComplete} />;

  if (mimeType.includes("pdf"))
    return (
      <Container>
        <PdfViewer fileUrl={getFetchableUrl(animationUri) || ""} />
      </Container>
    );

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
        <VideoPlayer url={getFetchableUrl(animationUri) || ""} />
      </Container>
    );
  }

  if (imageUri) {
    return (
      <div className="size-full cursor-pointer">
        <Image
          src={getFetchableUrl(imageUri) || previewSrc || ""}
          alt="Image Preview"
          onClick={handleImageClick}
          blurDataURL={previewSrc}
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
