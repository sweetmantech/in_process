import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ImageEditor from "./ImageEditor";

const RepositionModal = () => {
  const { 
    previewSrc, 
    setPreviewPosition, 
    setPreviewScale,
    isOpenPreviewUpload, 
    setIsOpenPreviewUpload 
  } = useZoraCreateProvider();

  if (!previewSrc) return null;

  return (
    <Dialog
      open={isOpenPreviewUpload}
      onOpenChange={() => setIsOpenPreviewUpload(!isOpenPreviewUpload)}
    >
      <DialogContent className="max-w-2xl !rounded-3xl !bg-white border-none py-6 !px-4 flex flex-col items-center !gap-4 shadow-lg overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Reposition Image</DialogTitle>
        </VisuallyHidden>
        
        <div className="w-full text-center">
          <h3 className="font-archivo-medium text-xl mb-2">Reposition Image</h3>
        </div>

        <ImageEditor src={previewSrc} alt="Preview image" />

        <p className="font-spectral text-sm text-grey-moss-400 text-center">
          drag to reposition
        </p>

        <div className="flex gap-3 w-full">
          <button
            type="button"
            className="flex-1 py-2 font-archivo rounded-sm border border-grey-moss-900 
            hover:border-grey-moss-300 hover:text-grey-eggshell hover:bg-grey-moss-300
            transform transition-transform duration-150"
            onClick={() => {
              setPreviewPosition({ x: 0, y: 0 });
              setPreviewScale(1);
            }}
          >
            reset
          </button>
          <button
            type="button"
            className="flex-1 py-2 font-archivo rounded-sm bg-grey-moss-900 text-grey-eggshell
            hover:border-grey-moss-300 hover:bg-grey-moss-300
            transform transition-transform duration-150"
            onClick={() => setIsOpenPreviewUpload(false)}
          >
            done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RepositionModal; 