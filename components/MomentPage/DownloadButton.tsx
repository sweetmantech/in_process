import useDownload from "@/hooks/useDownload";
import { DownloadIcon } from "lucide-react";

const DownloadButton = () => {
  const { download } = useDownload();

  return (
    <button
      type="button"
      className="rounded-sm border border-grey-moss-900 bg-white p-1"
      onClick={download}
    >
      <DownloadIcon className="size-4 text-grey-moss-900" />
    </button>
  );
};

export default DownloadButton;
