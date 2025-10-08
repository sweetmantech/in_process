import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";

const ExternalWalletInputModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [externalWallet, setExternalWallet] = useState<string>("");

  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={() => {
        setIsOpenModal(!isOpenModal);
      }}
    >
      <DialogTrigger
        asChild
        className="disabled:cursor-not-allowed disabled:bg-grey-moss-300"
        onClick={() => setIsOpenModal(true)}
      >
        <button className="self-end px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 !outline-none !border-none">
          connect
        </button>
      </DialogTrigger>
      <DialogOverlay className="opacity-80 !pointer-events-none" />
      <DialogContent className="max-w-xl !rounded-3xl !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Input External Wallet</DialogTitle>
        </VisuallyHidden>
        <input
          type="text"
          placeholder="input external wallet"
          className="!px-4 py-2 w-full placeholder-grey-moss-300 text-3xl font-archivo !outline-none !border-none"
          value={externalWallet}
          onChange={(e) => setExternalWallet(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsOpenModal(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExternalWalletInputModal;
