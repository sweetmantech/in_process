"use client";

import LoginButton from "../LoginButton";
import useSignedAddress from "@/hooks/useSignedAddress";
import { DropdownMenu } from "../LoginButton/DropdownMenu";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import CreateCTAButton from "./CreateCTAButton";
import useIsMobile from "@/hooks/useIsMobile";
import NotificationButton from "./NotificationButton";

const HeaderAuthSection = () => {
  const signedAddress = useSignedAddress();
  const { isOpenNavbar, toggleNavbar, isExpandedSearchInput } = useLayoutProvider();
  const isMobile = useIsMobile();

  return (
    <>
      {signedAddress && <NotificationButton />}
      {!isMobile && <CreateCTAButton />}
      <div className="flex items-center gap-1 md:relative md:gap-2">
        {!isExpandedSearchInput && <LoginButton />}
        {signedAddress && (
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
        {isOpenNavbar && signedAddress && <DropdownMenu />}
      </div>
    </>
  );
};

export default HeaderAuthSection;
