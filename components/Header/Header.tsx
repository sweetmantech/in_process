"use client";

import dynamic from "next/dynamic";
import Logo from "../Logo";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { Z_BEHIND_PRIVY } from "@/lib/consts";
import ArtistSearch from "../ArtistSearch";

const HeaderAuthSection = dynamic(() => import("./HeaderAuthSection"), { ssr: false });

const Header = () => {
  const { isOpenNavbar, menuRef } = useLayoutProvider();

  return (
    <div
      className={`${isOpenNavbar ? "bg-grey-moss-900" : "bg-grey-moss-100/90"} opacity-99 md:bg-transparent z-[${Z_BEHIND_PRIVY}] w-screen`}
    >
      <div className="flex items-center justify-between px-6 py-8 md:px-10">
        <Logo />
        <div className="flex items-center gap-1 md:gap-2" ref={menuRef}>
          <ArtistSearch />
          <HeaderAuthSection />
        </div>
      </div>
      {/* Black line from logo to wallet dropdown */}
      <div className="mx-6 border-b border-grey md:mx-10" />
    </div>
  );
};

export default Header;
