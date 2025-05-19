import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSearchProfile from "@/hooks/useSearchProfile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SearchIcon, X } from "lucide-react";

const SearchModal = () => {
  const {
    clear,
    onChangeSearchKey,
    onKeyDown,
    searchKey,
    suffixHint,
    isOpenModal,
    setIsOpenModal,
  } = useSearchProfile();

  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={() => {
        clear();
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
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>
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
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="search inprocess"
              className="placeholder-grey-moss-300 !max-w-[370px] text-5xl font-archivo !outline-none !border-none"
              value={searchKey}
              onChange={onChangeSearchKey}
              onKeyDown={onKeyDown}
            />
            <div className="absolute left-0 top-0 flex pointer-events-none">
              <p className="text-5xl font-archivo opacity-0">{searchKey}</p>
              <span className="font-archivo text-grey-moss-300 text-5xl">
                {suffixHint}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
