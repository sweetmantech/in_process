import { useLayoutProvider } from "@/providers/LayoutProvider";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  const { setIsExpandedSearchInput, isExpandedSearchInput } =
    useLayoutProvider();

  return (
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
            />
          </div>
          <div className="h-4 w-0.5 bg-grey-moss-300" />
          <button type="button" className="font-archivo text-sm">
            search
          </button>
        </>
      )}
    </div>
  );
};

export default SearchInput;
