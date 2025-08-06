import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import UploadPreview from "./UploadPreview";
import { CropImageProvider } from "@/providers/CropImageProvider";

const PreviewModal = () => {
  const { setIsOpenPreviewUpload, isOpenPreviewUpload } =
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
      <DialogContent className="max-w-xl !rounded-3xl !bg-white border-none py-6 !px-4 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Leave feedback</DialogTitle>
        </VisuallyHidden>
        <CropImageProvider>
          <UploadPreview />
        </CropImageProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
