import { useLayoutProvider } from "@/providers/LayoutProvider";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Address, zeroAddress } from "viem";
import { useArtistSearch } from "./useArtistSearch";

const useSearchProfile = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [artistAddress, setArtistAddress] = useState<Address>(zeroAddress);
  const [suffixHint, setSuffixHint] = useState<string>("");
  const { push } = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { setIsExpandedSearchInput } = useLayoutProvider();
  const [artistName, setArtistName] = useState<string>("");
  const {
    data: userSearchData,
    refetch: refetchUserSearch,
    isLoading: isUserSearchLoading,
  } = useArtistSearch(searchKey);

  const clear = () => {
    setArtistName("");
    setArtistAddress(zeroAddress);
    setSuffixHint("");
  };

  const redirectToArtist = () => {
    if (artistAddress === zeroAddress) return;
    setIsOpenModal(false);
    setIsExpandedSearchInput(false);
    push(`/${artistAddress}`);
  };

  const onKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>
  ) => {
    if (e.key === "Tab") {
      setSearchKey(artistName);
      setSuffixHint("");
      return;
    }
    if (e.key === "Enter") redirectToArtist();
  };
  const onChangeSearchKey = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);

    if (!value) {
      clear();
      return;
    }

    clear();
  };

  useEffect(() => {
    if (!userSearchData || !userSearchData?.artist) return;
    const searchString = userSearchData.artist.username || "";
    setArtistName(searchString);
    setArtistAddress(userSearchData.artist.address as Address);
    setSuffixHint(searchString.slice(searchKey.length));
  }, [userSearchData, searchKey.length]);

  useEffect(() => {
    if (!searchKey) return;
    if (!isUserSearchLoading) refetchUserSearch();
  }, [searchKey, refetchUserSearch, isUserSearchLoading]);

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
    clear,
    onChangeSearchKey,
    onKeyDown,
    suffixHint,
    searchKey,
    redirectToArtist,
    isOpenModal,
    setIsOpenModal,
  };
};

export default useSearchProfile;
