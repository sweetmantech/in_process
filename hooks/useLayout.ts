import { useEffect, useRef, useState } from "react";
import useSignedAddress from "./useSignedAddress";

const useLayout = () => {
  const menuRef = useRef() as any;
  const signedAddress = useSignedAddress();
  const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(false);
  const toggleNavbar = () => {
    if (!signedAddress) return;
    setIsOpenNavbar(!isOpenNavbar);
  };

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpenNavbar(false);
    };

    document.addEventListener("mousedown", handleClose);

    return () => document.removeEventListener("mousedown", handleClose);
  }, [menuRef]);

  return {
    toggleNavbar,
    isOpenNavbar,
    menuRef,
  };
};

export default useLayout;
