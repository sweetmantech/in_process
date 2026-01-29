import { useEffect, useRef, useState } from "react";
import useConnectedWallet from "./useConnectedWallet";

const useLayout = () => {
  const menuRef = useRef(null) as any;
  const { privyWallet } = useConnectedWallet();
  const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(false);
  const [isExpandedSearchInput, setIsExpandedSearchInput] = useState<boolean>(false);

  const toggleNavbar = () => {
    if (!privyWallet?.address) return;
    setIsOpenNavbar(!isOpenNavbar);
  };

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpenNavbar(false);
    };

    document.addEventListener("mousedown", handleClose);

    return () => document.removeEventListener("mousedown", handleClose);
  }, [menuRef]);

  return {
    toggleNavbar,
    isOpenNavbar,
    menuRef,
    isExpandedSearchInput,
    setIsExpandedSearchInput,
  };
};

export default useLayout;
