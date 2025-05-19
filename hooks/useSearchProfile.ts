import { useInProcessProvider } from "@/providers/InProcessProvider";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Address, zeroAddress } from "viem";

const useSearchProfile = () => {
  const { profiles } = useInProcessProvider();
  const [searchKey, setSearchKey] = useState<string>("");
  const [artistAddress, setArtistAddress] = useState<Address>(zeroAddress);
  const [suffixHint, setSuffixHint] = useState<string>("");
  const { push } = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { setIsExpandedSearchInput } = useLayoutProvider();
  const [artistName, setArtistName] = useState<string>("");

  const clear = () => {
    setArtistAddress(zeroAddress);
    setSuffixHint("");
  };

  const redirectToArtist = () => {
    if (artistAddress === zeroAddress) return;
    setIsOpenModal(false);
    setIsExpandedSearchInput(false);
    push(`/${artistAddress}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
    // eslint-disable-next-line
    const find = Object.entries(profiles).find(([_, profile]) => {
      return (
        (profile.username || "").toLowerCase().search(value.toLowerCase()) >= 0
      );
    });
    if (!value) {
      clear();
      return;
    }
    if (find) {
      setArtistAddress(find[0] as Address);
      setArtistName(find[1].username || "");
      const findArtistName = find[1].username || "";
      const findIndex = findArtistName
        .toLowerCase()
        .search(value.toLowerCase());
      const suffix = findArtistName.slice(findIndex + value.length);
      setSuffixHint(suffix);
      return;
    }

    clear();
  };

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
