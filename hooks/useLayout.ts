import { useState } from "react";
import useSignedAddress from "./useSignedAddress";

const useLayout = () => {
  const signedAddress = useSignedAddress();
  const [isOpenNavbar, setisOpenNavbar] = useState<boolean>(false);
  const toggleNavbar = () => {
    if (!signedAddress) return;
    setisOpenNavbar(!isOpenNavbar);
  };

  return {
    toggleNavbar,
    isOpenNavbar,
  };
};

export default useLayout;
