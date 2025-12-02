import AudioPlayer from "./AudioPlayer";
import Image from "next/image";
import React, { Fragment, useState, useEffect } from "react";
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
  const { mimeType, previewFile, animationFile, videoFile } = useMomentFormProvider();

  // Create blob URLs for PDFs, videos, and preview images
  const [pdfFileUrl, setPdfFileUrl] = useState<string>("");
  const [videoFileUrl, setVideoFileUrl] = useState<string>("");
  const [previewFileUrl, setPreviewFileUrl] = useState<string>("");

  useEffect(() => {
    if (previewFile) {
      const blobUrl = URL.createObjectURL(previewFile);
      setPreviewFileUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setPreviewFileUrl("");
    }
  }, [previewFile]);

  useEffect(() => {
    if (mimeType.includes("pdf") && animationFile) {
      const blobUrl = URL.createObjectURL(animationFile);
      setPdfFileUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setPdfFileUrl("");
    }
  }, [animationFile, mimeType]);

  useEffect(() => {
    if (mimeType.includes("video") && videoFile) {
      // Use blob URL for preview before upload
      const blobUrl = URL.createObjectURL(videoFile);
      setVideoFileUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setVideoFileUrl("");
    }
  }, [videoFile, mimeType]);

  // For PDFs: use blob URL if file exists, otherwise use uploaded URI
  if (mimeType.includes("pdf")) {
    return (
      <Container>
        <PdfViewer fileUrl={pdfFileUrl} />
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
        <VideoPlayer url={videoFileUrl} />
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
