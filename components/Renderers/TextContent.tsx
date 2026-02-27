import { Skeleton } from "@/components/ui/skeleton";
import ErrorContent from "./ErrorContent";
import Writing from "./Writing";

interface TextContentProps {
  contentLoading: boolean;
  contentUrl: string | null;
  description: string;
}

const TextContent = ({ contentLoading, contentUrl, description }: TextContentProps) => {
  if (contentLoading) return <Skeleton className="size-full" />;
  if (!contentUrl) return <ErrorContent />;
  return <Writing fileUrl={contentUrl} description={description} />;
};

export default TextContent;
