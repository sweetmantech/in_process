"use client";

import { useState } from "react";
import LoginButton from "../LoginButton";
import Logo from "../Logo";
import useSignedAddress from "@/hooks/useSignedAddress";
import { DropdownMenu } from "../LoginButton/DropdownMenu";
import { usePrivy } from "@privy-io/react-auth";

const Header = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  const signedAddress = useSignedAddress();
  const { logout } = usePrivy();
  const toggleDropDown = () => {
    if (!signedAddress) return;
    setIsOpenDropDown(!isOpenDropDown);
  };
  return (
    <div
      className={`${isOpenDropDown ? "bg-grey-moss-900 border-b border-grey-moss-900" : ""} md:border-none md:bg-transparent 
      z-[9999999] relative w-screen flex justify-between items-center px-6 md:px-10 py-4 md:pt-6`}
    >
      <Logo isOpenDropDown={isOpenDropDown} />
      <div className="md:relative flex items-center gap-2">
        <LoginButton toggle={toggleDropDown} isOpenDropDown={isOpenDropDown} />
        {signedAddress && (
          <button
            onClick={toggleDropDown}
            type="button"
            className="block md:hidden flex flex-col bg-grey-moss-400 py-1.5 px-2 rounded-md"
          >
            <div className="size-2 rounded-full bg-grey-moss-100" />
            <div className="size-2 rounded-full bg-grey-moss-100" />
            <div className="size-2 rounded-full bg-grey-moss-100" />
          </button>
        )}
        {isOpenDropDown && signedAddress && (
          <DropdownMenu
            onLogout={() => {
              logout();
              toggleDropDown();
            }}
            onClose={toggleDropDown}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
