import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSearch from "@/hooks/useSearch";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import SearchNotFound from "./SearchNotFound";

const SearchModal = () => {
  const {
    userSearchData,
    isLoadingSearch,
    onChangeSearchKey,
    onKeyDown,
    searchKey,
    suffixHint,
    isOpenModal,
    setIsOpenModal,
  } = useSearch();

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
          <Image
            src="/search_icon.svg"
            blurDataURL="/search_icon.png"
            alt="search icon"
            width={24}
            height={24}
          />
        </button>
      </DialogTrigger>
      <DialogOverlay className="opacity-80 !pointer-events-none" />
      <DialogContent className="max-w-xl !rounded-3xl !bg-white border-none py-10 px-8 flex flex-col items-center !gap-0 shadow-lg overflow-hidden bg-transparent">
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>
        <button
          onClick={() => setIsOpenModal(false)}
          type="button"
          className="absolute right-8 top-8 rounded-sm !border-none !outline-none"
          onKeyDown={onKeyDown}
        >
          <Image
            src="/close_icon.svg"
            blurDataURL="/close_icon.png"
            alt="close icon"
            width={24}
            height={24}
          />
        </button>
        <div className="flex gap-10 items-center py-12">
          <Image
            src="/search_icon.svg"
            blurDataURL="/search_icon.png"
            alt="search icon"
            width={52}
            height={52}
          />
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="search inprocess"
              className="placeholder-grey-moss-300 !max-w-[370px] text-5xl font-archivo !outline-none !border-none"
              value={searchKey}
              onChange={onChangeSearchKey}
              onKeyDown={onKeyDown}
              autoFocus
            />
            <div className="absolute left-0 top-0 flex pointer-events-none">
              <p className="text-5xl font-archivo opacity-0">{searchKey}</p>
              <span className="font-archivo text-grey-moss-300 text-5xl">
                {suffixHint}
              </span>
            </div>
          </div>
        </div>
        {searchKey && !isLoadingSearch && !userSearchData?.artist && (
          <SearchNotFound />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
