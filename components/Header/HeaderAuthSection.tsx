"use client";

import LoginButton from "../LoginButton";
import { DropdownMenu } from "../LoginButton/DropdownMenu";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import CreateCTAButton from "./CreateCTAButton";
import useIsMobile from "@/hooks/useIsMobile";
import NotificationButton from "./NotificationButton";
import { useUserProvider } from "@/providers/UserProvider";

const HeaderAuthSection = () => {
  const { artistWallet } = useUserProvider();
  const { isOpenNavbar, toggleNavbar, isExpandedSearchInput } = useLayoutProvider();
  const isMobile = useIsMobile();

  return (
    <>
      {artistWallet && <NotificationButton />}
      {!isMobile && <CreateCTAButton />}
      <div className="flex items-center gap-1 md:relative md:gap-2">
        {!isExpandedSearchInput && <LoginButton />}
        {artistWallet && (
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
        {isOpenNavbar && artistWallet && <DropdownMenu />}
      </div>
    </>
  );
};

export default HeaderAuthSection;
