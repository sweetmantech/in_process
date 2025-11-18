import AudioPlayer from "./AudioPlayer";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import React, { Fragment } from "react";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import UploadSpinner from "@/components/TokenManagePage/UploadSpinner";
import { useMomentMetadataProvider } from "@/providers/MomentMetadataProvider";
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
  const { animationUri, imageUri, mimeType, previewSrc } = useMomentFormProvider();
  const { pctComplete, fileUploading } = useMomentMetadataProvider();

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
