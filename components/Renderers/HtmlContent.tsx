import { isSafeIframeUrl } from "@/lib/protocolSdk/ipfs/isSafeIframeUrl";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorContent from "./ErrorContent";

interface HtmlContentProps {
  rawAnimationUri: string;
  animationLoading: boolean;
  animationUrl: string | null;
  title?: string;
}

const HtmlContent = ({
  rawAnimationUri,
  animationLoading,
  animationUrl,
  title,
}: HtmlContentProps) => {
  if (!isSafeIframeUrl(rawAnimationUri)) {
    return (
      <div className="flex size-full items-center justify-center p-4 text-center">
        <p className="text-grey-moss-400">
          HTML content from external URLs is not allowed for security reasons. Please use IPFS or
          Arweave URLs.
        </p>
      </div>
    );
  }
  if (animationLoading) return <Skeleton className="size-full" />;
  if (!animationUrl) return <ErrorContent />;
  return (
    <iframe
      src={animationUrl}
      className="w-full"
      title={title || "Embedded content"}
      sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
};

export default HtmlContent;
