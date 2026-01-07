import useIsCreateMode from "@/hooks/useIsCreateMode";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { ImageIcon } from "lucide-react";

const ThumbnailUpload = () => {
  const isCreateMode = useIsCreateMode();
  const { setIsOpenPreviewUpload } = useMetadataFormProvider();

  if (!isCreateMode) return null;

  return (
    <div
      className="flex size-full flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 cursor-pointer"
      onClick={() => setIsOpenPreviewUpload(true)}
    >
      <ImageIcon className="mb-3 size-12 text-gray-400" strokeWidth={1.5} />
      <p className="text-sm font-medium text-gray-500">Upload thumbnail</p>
    </div>
  );
};

export default ThumbnailUpload;
