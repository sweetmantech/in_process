"use client";

import LoginButton from "../LoginButton";
import Logo from "../Logo";
import useSignedAddress from "@/hooks/useSignedAddress";
import { DropdownMenu } from "../LoginButton/DropdownMenu";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import CreateCTAButton from "./CreateCTAButton";
import useIsMobile from "@/hooks/useIsMobile";
import ArtistSearch from "../ArtistSearch";
import NotificationButton from "./NotificationButton";

const Header = () => {
  const signedAddress = useSignedAddress();
  const { isOpenNavbar, toggleNavbar, menuRef, isExpandedSearchInput } =
    useLayoutProvider();
  const isMobile = useIsMobile();

  return (
    <div
      className={`${isOpenNavbar ? "bg-grey-moss-900" : "bg-grey-moss-100/90"} md:bg-grey-moss-100/90 opacity-99 
      z-[9999999] sticky top-0 w-screen`}
    >
      <div className="flex justify-between items-center px-6 md:px-10 py-8">
        <Logo />
        <div className="flex items-center gap-1 md:gap-2" ref={menuRef}>
          <ArtistSearch />
          {signedAddress && <NotificationButton />}
          {!isMobile && <CreateCTAButton />}
          <div className="md:relative flex items-center gap-1 md:gap-2">
            {!isExpandedSearchInput && <LoginButton />}
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
            {isOpenNavbar && signedAddress && <DropdownMenu />}
          </div>
        </div>
      </div>
      {/* Black line from logo to wallet dropdown */}
      <div className="border-b border-grey mx-6 md:mx-10" />
    </div>
  );
};

export default Header;
