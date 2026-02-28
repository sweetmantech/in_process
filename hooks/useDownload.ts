import { useWayfinderRequest } from "@ar.io/wayfinder-react";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isArweaveURL } from "@/lib/protocolSdk/ipfs/arweave";
import { validateUrl } from "@/lib/url/validateUrl";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMutation } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";

const useDownload = () => {
  const { metadata } = useMomentProvider();
  const request = useWayfinderRequest();
  const { getAccessToken } = usePrivy();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!metadata) return;
      const accessToken = await getAccessToken();
      const contentUri = metadata.content.uri;
      let data: Blob;

      if (isArweaveURL(contentUri)) {
        console.log("ziad here");
        const response = await request(contentUri, {
          verificationSettings: { enabled: true, strict: false },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        data = await response.blob();
      } else {
        const fetchableUrl = getFetchableUrl(contentUri);

        // Validate URL before downloading to prevent malicious downloads
        // blob: and data: URIs are local/inline — skip remote URL validation for them
        const isLocalUri = fetchableUrl?.startsWith("blob:") || fetchableUrl?.startsWith("data:");
        if (!fetchableUrl || (!isLocalUri && !validateUrl(fetchableUrl))) {
          console.error("Invalid or unsafe URL for download");
          return;
        }

        data = await fetch(fetchableUrl, {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        }).then((res) => res.blob());
      }

      const link = document.createElement("a");
      link.download = metadata.name;
      link.href = window.URL.createObjectURL(new Blob([data], { type: metadata.content.mime }));
      link.click();
      link.remove();
      window.URL.revokeObjectURL(link.href);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    download: () => mutation.mutate(),
    isDownloading: mutation.isPending,
  };
};

export default useDownload;
