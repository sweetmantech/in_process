import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MomentMetadata } from "@/types/moment";

const COLLECT_PAGE_REGEX =
  /https?:\/\/[^/]+\/(collect|manage)\/(base|eth|bsep):(0x[0-9a-fA-F]{40})\/\d+/;

const useMigratedCollectionRedirect = (metadata: MomentMetadata | null) => {
  const router = useRouter();

  useEffect(() => {
    if (
      metadata?.content?.uri === "" &&
      metadata?.external_url &&
      COLLECT_PAGE_REGEX.test(metadata.external_url)
    ) {
      const targetPath = new URL(metadata.external_url, window.location.origin).pathname;
      if (targetPath !== window.location.pathname) {
        router.replace(metadata.external_url);
      }
    }
  }, [metadata, router]);
};

export default useMigratedCollectionRedirect;
