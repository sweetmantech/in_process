"use client";

import LoginButton from "../LoginButton";
import { DropdownMenu } from "../LoginButton/DropdownMenu";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import CreateCTAButton from "./CreateCTAButton";
import useIsMobile from "@/hooks/useIsMobile";
import NotificationButton from "./NotificationButton";
import useConnectedWallet from "@/hooks/useConnectedWallet";

const HeaderAuthSection = () => {
  const { privyWallet } = useConnectedWallet();
  const { isOpenNavbar, toggleNavbar, isExpandedSearchInput } = useLayoutProvider();
  const isMobile = useIsMobile();

  return (
    <>
      {privyWallet?.address && <NotificationButton />}
      {!isMobile && <CreateCTAButton />}
      <div className="flex items-center gap-1 md:relative md:gap-2">
        {!isExpandedSearchInput && <LoginButton />}
        {privyWallet?.address && (
          <button
            onClick={toggleNavbar}
            type="button"
            className="flex flex-col rounded-md bg-grey-moss-400 px-2 py-1.5 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpenNavbar}
          >
            <div className="size-2 rounded-full bg-grey-moss-100" />
            <div className="size-2 rounded-full bg-grey-moss-100" />
            <div className="size-2 rounded-full bg-grey-moss-100" />
          </button>
        )}
        {isOpenNavbar && privyWallet?.address && <DropdownMenu />}
      </div>
    </>
  );
};

export default HeaderAuthSection;
