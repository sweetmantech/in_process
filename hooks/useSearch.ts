import { useLayoutProvider } from "@/providers/LayoutProvider";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { searchByQuery, SearchByQueryResponse } from "@/lib/searchByQuery";

const useSearch = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const { push } = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { setIsExpandedSearchInput } = useLayoutProvider();
  const { data: userSearchData, isLoading: isLoadingSearch } =
    useQuery<SearchByQueryResponse>({
      queryKey: ["search", searchKey],
      queryFn: () => searchByQuery(searchKey),
      enabled: !!searchKey, // Only run if query is non-empty
      staleTime: 1000 * 30, // 30 seconds (adjust as needed)
    });
  const suffixHint = useMemo(() => {
    if (!userSearchData?.artist || !userSearchData?.artist?.username) return "";
    return userSearchData?.artist?.username.slice(searchKey.length);
  }, [userSearchData, searchKey]);

  const redirectToArtist = () => {
    if (!userSearchData?.artist) return;
    setIsOpenModal(false);
    setIsExpandedSearchInput(false);
    push(`/${userSearchData?.artist?.address}`);
  };

  const onKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
  ) => {
    if (e.key === "Tab") {
      setSearchKey(userSearchData?.artist?.username || "");
      return;
    }
    if (e.key === "Enter") redirectToArtist();
  };
  const onChangeSearchKey = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  useEffect(() => {
    function preventTab(e: any) {
      e = e || window.event;
      if (e.keyCode === 9) {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", preventTab);

    // Call this when modal window closes/unmounts
    window.removeEventListener("keydown", preventTab);
  }, [isOpenModal]);

  return {
    userSearchData,
    isLoadingSearch,
    onChangeSearchKey,
    onKeyDown,
    suffixHint,
    searchKey,
    redirectToArtist,
    isOpenModal,
    setIsOpenModal,
  };
};

export default useSearch;
