"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  className?: string;
}
const Logo = ({ className = "" }: LogoProps) => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const { isOpenNavbar } = useLayoutProvider();

  return (
    <button
      className={`relative w-[80px] md:w-[128px] h-[18px] md:h-[29px] ${className}`}
      type="button"
      onClick={() => push("/")}
    >
      {isOpenNavbar && isMobile ? (
        <Image
          src="/white_logo.svg"
          blurDataURL="/white_logo.png"
          alt="not found logo"
          fill
        />
      ) : (
        <Image
          src="/logo.svg"
          blurDataURL="/logo.png"
          alt="not found logo"
          fill
        />
      )}
    </button>
  );
};

export default Logo;
