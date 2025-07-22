import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import UploadPreview from "./UploadPreview";
import ImageEditor from "./ImageEditor";

const PreviewModal = () => {
  const { setIsOpenPreviewUpload, isOpenPreviewUpload, isEditingPreview } =
    useZoraCreateProvider();

  return (
    <Dialog
      open={isOpenPreviewUpload}
      onOpenChange={() => setIsOpenPreviewUpload(!isOpenPreviewUpload)}
    >
      <DialogTrigger
        asChild
        onClick={() => setIsOpenPreviewUpload(true)}
        className="disabled:cursor-not-allowed disabled:bg-grey-moss-300"
      >
        <button
          type="button"
          className="self-center w-fit z-10 md:w-full md:!mt-4 font-archivo 
        border border-grey-moss-900 
        hover:border-grey-moss-300 hover:bg-grey-moss-300 
        text-grey-moss-900 hover:text-grey-eggshell
        md:h-[60px] !text-xl !rounded-sm transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
        >
          set preview
        </button>
      </DialogTrigger>
      <DialogContent className="w-[600px] !rounded-3xl !bg-white border-none py-6 !px-4 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Leave feedback</DialogTitle>
        </VisuallyHidden>
        {isEditingPreview ? <ImageEditor /> : <UploadPreview />}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
