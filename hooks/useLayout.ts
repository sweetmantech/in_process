import { useState } from "react";
import useSignedAddress from "./useSignedAddress";

const useLayout = () => {
  const signedAddress = useSignedAddress();
  const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(false);
  const toggleNavbar = () => {
    if (!signedAddress) return;
    setIsOpenNavbar(!isOpenNavbar);
  };

  return {
    toggleNavbar,
    isOpenNavbar,
  };
};

export default useLayout;
