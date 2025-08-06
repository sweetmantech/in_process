import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Spinner from "../ui/spinner";
import AudioPlayer from "./AudioPlayer";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import React, { Fragment } from "react";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";

interface MediaUploadedProps {
  handleImageClick: () => void;
}
const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`size-full flex justify-center ${className}`}>{children}</div>
);

const MediaUploaded = ({ handleImageClick }: MediaUploadedProps) => {
  const {
    fileUploading,
    mimeType,
    animationUri,
    imageUri,
    pctComplete,
    previewSrc,
  } = useZoraCreateProvider();

  if (fileUploading) {
    return (
      <Container className="flex flex-col items-center gap-2">
        <Spinner />
        <p className="font-archivo text-xl">{pctComplete} %</p>
      </Container>
    );
  }

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
      <div className="size-full">
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
