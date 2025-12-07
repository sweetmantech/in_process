import useSearch from "@/hooks/useSearch";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { SearchIcon } from "lucide-react";
import SearchNotFound from "./SearchNotFound";

const SearchInput = () => {
  const { setIsExpandedSearchInput, isExpandedSearchInput } = useLayoutProvider();
  const {
    userSearchData,
    isLoadingSearch,
    searchKey,
    onChangeSearchKey,
    suffixHint,
    redirectToArtist,
  } = useSearch();

  return (
    <div className="relative">
      <div className="flex min-h-9 items-center gap-1 rounded-sm bg-white px-2 py-2">
        <SearchIcon
          className="size-4"
          onClick={() => setIsExpandedSearchInput(!isExpandedSearchInput)}
        />
        {isExpandedSearchInput && (
          <>
            <div className="relative flex items-center overflow-hidden">
              <input
                type="text"
                className="!w-[70px] font-archivo text-sm placeholder-grey-moss-300 !outline-none"
                placeholder="search inprocess"
                value={searchKey}
                onChange={onChangeSearchKey}
              />
              <div className="pointer-events-none absolute left-0 top-0 flex min-w-[900px] items-center">
                <p className="font-archivo text-sm opacity-0 !outline-none">{searchKey}</p>
                <span className="font-archivo text-sm text-grey-moss-300">{suffixHint}</span>
              </div>
            </div>
            <div className="h-4 w-0.5 bg-grey-moss-300" />
            <button type="button" className="font-archivo text-sm" onClick={redirectToArtist}>
              search
            </button>
          </>
        )}
      </div>
      {searchKey && !isLoadingSearch && !userSearchData?.artist && <SearchNotFound />}
    </div>
  );
};

export default SearchInput;
