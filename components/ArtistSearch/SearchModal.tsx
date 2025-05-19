import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SearchIcon, X } from "lucide-react";
import { useState } from "react";

const SearchModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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
        <button type="button" className="hover:bg-grey-eggshell rounded-md p-2">
          <SearchIcon className="size-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl !rounded-3xl !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <button
          onClick={() => setIsOpenModal(false)}
          type="button"
          className="absolute right-4 top-4 rounded-sm !border-none !outline-none"
        >
          <X className="size-8" />
        </button>
        <div className="flex gap-4 items-center py-12">
          <SearchIcon className="text-grey-moss-900 size-12" />
          <div className="h-12 w-0.5 bg-grey-moss-400" />
          <input
            type="text"
            placeholder="search inprocess"
            className="placeholder-grey-moss-300 text-5xl font-archivo !w-[370px] !outline-none !border-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
