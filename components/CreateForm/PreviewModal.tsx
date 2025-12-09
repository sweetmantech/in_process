import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import UploadPreview from "./UploadPreview";
import { CropImageProvider } from "@/providers/CropImageProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const PreviewModal = () => {
  const { setIsOpenPreviewUpload, isOpenPreviewUpload } = useMetadataFormProvider();

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
          className="disabled:opacity-1 z-10 w-fit transform self-center !rounded-sm border border-grey-moss-900 font-archivo !text-xl text-grey-moss-900 transition-transform duration-150 hover:border-grey-moss-300 hover:bg-grey-moss-300 hover:text-grey-eggshell disabled:!pointer-events-auto disabled:!cursor-not-allowed md:!mt-4 md:h-[60px] md:w-full"
        >
          set preview
        </button>
      </DialogTrigger>
      <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent !px-4 py-6 shadow-lg">
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
