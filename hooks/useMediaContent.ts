import useArweaveUrl from "@/hooks/useArweaveUrl";
import { TokenMetadataJson } from "@/lib/protocolSdk";

const useMediaContent = (metadata: TokenMetadataJson | null | undefined) => {
  const mimeType = metadata?.content?.mime || "";
  const rawAnimationUri = metadata?.animation_url || "";
  const rawImageUri = metadata?.image || "";
  const rawContentUri = metadata?.content?.uri || "";

  // Resolve Arweave URLs via Wayfinder (fastest verified gateway)
  const { url: animationUrl, isLoading: animationLoading } = useArweaveUrl(rawAnimationUri);
  const { url: contentUrl, isLoading: contentLoading } = useArweaveUrl(rawContentUri);

  return {
    mimeType,
    rawAnimationUri,
    rawImageUri,
    rawContentUri,
    animationUrl,
    animationLoading,
    contentUrl,
    contentLoading,
  };
};

export default useMediaContent;
