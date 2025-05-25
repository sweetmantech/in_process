import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChangeEvent, useRef, useState } from "react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { toast } from "sonner";

const PreviewModal = () => {
  const { previewUri, setPreviewUri } = useZoraCreateProvider();
  const [progress, setProgress] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const previewRef = useRef() as any;
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleClick = () => {
    if (!previewRef.current) return;
    previewRef.current.click();
  };

  const handlePreviewUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = e.target.files;
    if (!files?.length) return;
    const file = files[0];
    if (!file.type.includes("image")) {
      toast.error("please, select only image file.");
      return;
    }
    const previewUri = await clientUploadToArweave(file, (value: number) =>
      setProgress(value),
    );
    setPreviewUri(previewUri);
    setIsUploading(false);
  };

  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={() => setIsOpenModal(!isOpenModal)}
    >
      <DialogTrigger
        asChild
        onClick={() => setIsOpenModal(true)}
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
      <DialogContent className="max-w-xl !rounded-3xl !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Leave feedback</DialogTitle>
        </VisuallyHidden>
        <Label className="font-archivo-medium text-2xl text-center w-full">
          Preview
        </Label>
        <input
          type="file"
          className="hidden"
          ref={previewRef}
          accept="image/*"
          onChange={handlePreviewUpload}
        />
        <div className="w-3/4 aspect-video relative border border-grey mt-2">
          {previewUri && !isUploading ? (
            // eslint-disable-next-line
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              src={getFetchableUrl(previewUri) || ""}
              alt="not found preview."
            />
          ) : (
            <div className="size-full p-3 flex justify-center items-center">
              <p className="font-spectral text-3xl">
                {isUploading ? `${progress} %` : "No Preview."}
              </p>
            </div>
          )}
        </div>
        <p className="font-spectral-italic">click to resize</p>
        <button
          type="button"
          className="border border-grey-moss-900 w-3/4 mt-2 py-2 font-archivo rounded-sm 
        hover:border-grey-moss-300 hover:text-grey-eggshell hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
          onClick={handleClick}
        >
          upload thumbnail
        </button>
        <button
          type="button"
          className="w-3/4 mt-2 py-2 font-archivo rounded-sm bg-grey-moss-900 text-grey-eggshell
        hover:border-grey-moss-300 hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
          onClick={() => setIsOpenModal(false)}
        >
          done
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
