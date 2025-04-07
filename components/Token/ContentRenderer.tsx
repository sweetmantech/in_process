import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Metadata } from "@/types/token";
import Image from "next/image";
import PdfViewer from "../Renderers/PdfViewer";

interface ContentRendererProps {
  metadata: Metadata;
}

const ContentRenderer = ({ metadata }: ContentRendererProps) => {
  const mimeType = metadata.content.mime;

  if (mimeType.includes("pdf")) return <PdfViewer metadata={metadata} />;
  return (
    <Image
      src={getFetchableUrl(metadata.image) || "/images/placeholder.png"}
      alt="Token Image."
      layout="fill"
      objectFit="contain"
      objectPosition="top center"
      blurDataURL={getFetchableUrl(metadata.image) || "/images/placeholder.png"}
      unoptimized
    />
  );
};

export default ContentRenderer;
