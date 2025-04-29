"use client";

import LoginButton from "../LoginButton";
import Logo from "../Logo";
import useSignedAddress from "@/hooks/useSignedAddress";
import { DropdownMenu } from "../LoginButton/DropdownMenu";
import { usePrivy } from "@privy-io/react-auth";
import { useLayoutProvider } from "@/providers/LayoutProvider";

const Header = () => {
  const signedAddress = useSignedAddress();
  const { logout } = usePrivy();
  const { isOpenNavbar, toggleNavbar } = useLayoutProvider();

  return (
    <div
      className={`${isOpenNavbar ? "bg-grey-moss-900 border-b border-grey-moss-900" : ""} md:border-none md:bg-transparent 
      z-[9999999] relative w-screen flex justify-between items-center px-6 md:px-10 py-4 md:pt-6`}
    >
      <Logo isOpenNavbar={isOpenNavbar} />
      <div className="md:relative flex items-center gap-2">
        <LoginButton />
        {signedAddress && (
          <button
            onClick={toggleNavbar}
            type="button"
            className="block md:hidden flex flex-col bg-grey-moss-400 py-1.5 px-2 rounded-md"
          >
            <div className="size-2 rounded-full bg-grey-moss-100" />
            <div className="size-2 rounded-full bg-grey-moss-100" />
            <div className="size-2 rounded-full bg-grey-moss-100" />
          </button>
        )}
        {isOpenNavbar && signedAddress && (
          <DropdownMenu
            onLogout={() => {
              logout();
              toggleNavbar();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
