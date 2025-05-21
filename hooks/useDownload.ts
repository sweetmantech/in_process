import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useTokenProvider } from "@/providers/TokenProvider";

const useDownload = () => {
  const { metadata } = useTokenProvider();

  const download = async () => {
    if (!metadata.data) return;

    const link = document.createElement("a");
    link.download = metadata.data.name;
    const data = await fetch(
      getFetchableUrl(metadata.data.content.uri) || "",
    ).then((res) => res.blob());
    link.href = window.URL.createObjectURL(
      new Blob([data], { type: metadata.data.content.mime }),
    );
    link.click();
    link.remove();
    window.URL.revokeObjectURL(link.href);
  };

  return {
    download,
  };
};

export default useDownload;
