import useSearch from "@/hooks/useSearch";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  const { setIsExpandedSearchInput, isExpandedSearchInput } =
    useLayoutProvider();
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
      <div className="flex items-center gap-1 bg-white px-2 py-2 rounded-sm min-h-9">
        <SearchIcon
          className="size-4"
          onClick={() => setIsExpandedSearchInput(!isExpandedSearchInput)}
        />
        {isExpandedSearchInput && (
          <>
            <div className="relative overflow-hidden flex items-center">
              <input
                type="text"
                className="!w-[70px] font-archivo !outline-none text-sm placeholder-grey-moss-300"
                placeholder="search inprocess"
                value={searchKey}
                onChange={onChangeSearchKey}
              />
              <div className="absolute left-0 top-0 pointer-events-none flex items-center min-w-[900px]">
                <p className="font-archivo !outline-none text-sm opacity-0">
                  {searchKey}
                </p>
                <span className="font-archivo text-sm text-grey-moss-300">
                  {suffixHint}
                </span>
              </div>
            </div>
            <div className="h-4 w-0.5 bg-grey-moss-300" />
            <button
              type="button"
              className="font-archivo text-sm"
              onClick={redirectToArtist}
            >
              search
            </button>
          </>
        )}
      </div>
      {searchKey && !isLoadingSearch && !userSearchData?.artist && (
        <div className="w-fit h-fit absolute right-0 -bottom-[58px] py-2 px-3 bg-white rounded-sm">
          <div className="flex flex-col w-full items-end">
            <p className="text-grey-moss-300 text-sm p-0">
              no results in the matrix, search again
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
