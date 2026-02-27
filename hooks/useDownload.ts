import { useWayfinderRequest } from "@ar.io/wayfinder-react";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isArweaveURL } from "@/lib/protocolSdk/ipfs/arweave";
import { validateUrl } from "@/lib/url/validateUrl";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useState } from "react";

const useDownload = () => {
  const { metadata } = useMomentProvider();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const request = useWayfinderRequest();

  const download = async () => {
    if (!metadata.data) return;
    try {
      setIsDownloading(true);
      const contentUri = metadata.data.content.uri;
      let data: Blob;

      if (isArweaveURL(contentUri)) {
        const response = await request(contentUri, {
          verificationSettings: { enabled: true, strict: false },
        });
        data = await response.blob();
      } else {
        const fetchableUrl = getFetchableUrl(contentUri);

        // Validate URL before downloading to prevent malicious downloads
        if (!fetchableUrl || !validateUrl(fetchableUrl)) {
          console.error("Invalid or unsafe URL for download");
          setIsDownloading(false);
          return;
        }

        data = await fetch(fetchableUrl).then((res) => res.blob());
      }

      const link = document.createElement("a");
      link.download = metadata.data.name;
      link.href = window.URL.createObjectURL(
        new Blob([data], { type: metadata.data.content.mime })
      );
      link.click();
      link.remove();
      window.URL.revokeObjectURL(link.href);
      setIsDownloading(false);
    } catch (error) {
      console.error(error);
      setIsDownloading(false);
    }
  };

  return {
    download,
    isDownloading,
  };
};

export default useDownload;
