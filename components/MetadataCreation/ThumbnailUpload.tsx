import useIsCreatePage from "@/hooks/useIsCreatePage";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { ImageIcon } from "lucide-react";

const ThumbnailUpload = () => {
  const isCreatePage = useIsCreatePage();
  const { setIsOpenPreviewUpload } = useMetadataFormProvider();

  if (!isCreatePage) return null;

  return (
    <button
      type="button"
      className="flex size-full flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-neutral-600 cursor-pointer"
      onClick={() => setIsOpenPreviewUpload(true)}
    >
      <ImageIcon className="mb-3 size-12 text-white" strokeWidth={1.5} />
      <p className="text-sm font-medium text-white">Upload thumbnail</p>
    </button>
  );
};

export default ThumbnailUpload;
