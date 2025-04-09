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
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="size-full flex justify-center items-center">{children}</div>
);

const MediaUploaded = ({ handleImageClick }: MediaUploadedProps) => {
  const { fileUploading, blurImageUrl, mimeType, animationUri, imageUri } =
    useZoraCreateProvider();

  if (fileUploading) {
    return (
      <Container>
        <Spinner />
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
          src={blurImageUrl || getFetchableUrl(imageUri) || ""}
          alt="Image Preview"
          onClick={handleImageClick}
          blurDataURL={blurImageUrl}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    );
  }

  return <Fragment />;
};

export default MediaUploaded;
