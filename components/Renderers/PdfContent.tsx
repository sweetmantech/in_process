import { Skeleton } from "@/components/ui/skeleton";
import ErrorContent from "./ErrorContent";
import PdfViewer from "./PdfViewer";

interface PdfContentProps {
  animationLoading: boolean;
  animationUrl: string | null;
}

const PdfContent = ({ animationLoading, animationUrl }: PdfContentProps) => {
  if (animationLoading) return <Skeleton className="size-full" />;
  if (!animationUrl) return <ErrorContent />;
  return <PdfViewer fileUrl={animationUrl} />;
};

export default PdfContent;
