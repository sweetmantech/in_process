"use client";

import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  className?: string;
  isOpenNavbar: boolean;
}
const Logo = ({ className = "", isOpenNavbar }: LogoProps) => {
  const { push } = useRouter();
  const isMobile = useIsMobile();

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
