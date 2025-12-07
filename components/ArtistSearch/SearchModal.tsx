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
        <button type="button" className="rounded-md p-2 hover:bg-grey-eggshell">
          <Image
            src="/search_icon.svg"
            blurDataURL="/search_icon.png"
            alt="search icon"
            width={24}
            height={24}
          />
        </button>
      </DialogTrigger>
      <DialogOverlay className="!pointer-events-none opacity-80" />
      <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
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
        <div className="flex items-center gap-10 py-12">
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
              className="!max-w-[370px] !border-none font-archivo text-5xl placeholder-grey-moss-300 !outline-none"
              value={searchKey}
              onChange={onChangeSearchKey}
              onKeyDown={onKeyDown}
              autoFocus
            />
            <div className="pointer-events-none absolute left-0 top-0 flex">
              <p className="font-archivo text-5xl opacity-0">{searchKey}</p>
              <span className="font-archivo text-5xl text-grey-moss-300">{suffixHint}</span>
            </div>
          </div>
        </div>
        {searchKey && !isLoadingSearch && !userSearchData?.artist && <SearchNotFound />}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
