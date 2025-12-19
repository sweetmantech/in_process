import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { validateUrl } from "@/lib/url/validateUrl";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useState } from "react";

const useDownload = () => {
  const { metadata } = useMomentProvider();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const download = async () => {
    if (!metadata.data) return;
    try {
      setIsDownloading(true);
      const contentUri = metadata.data.content.uri;
      const fetchableUrl = getFetchableUrl(contentUri);

      // Validate URL before downloading to prevent malicious downloads
      if (!fetchableUrl || !validateUrl(fetchableUrl)) {
        console.error("Invalid or unsafe URL for download");
        setIsDownloading(false);
        return;
      }

      const link = document.createElement("a");
      link.download = metadata.data.name;
      const data = await fetch(fetchableUrl).then((res) => res.blob());
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
