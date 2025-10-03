import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useState } from "react";

const useDownload = () => {
  const { metadata } = useTokenProvider();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const download = async () => {
    if (!metadata.data) return;
    try {
      setIsDownloading(true);
      const link = document.createElement("a");
      link.download = metadata.data.name;
      const data = await fetch(getFetchableUrl(metadata.data.content.uri) || "").then((res) =>
        res.blob()
      );
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
