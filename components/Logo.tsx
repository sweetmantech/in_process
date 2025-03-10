"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  className?: string;
}
const Logo = ({ className = "" }: LogoProps) => {
  const { push } = useRouter();

  return (
    <button
      className={`w-[80px] md:w-[128px] h-[18px] md:h-[29px] ${className}`}
      type="button"
      onClick={() => push("/")}
    >
      <Image
        src="/logo.svg"
        blurDataURL="/logo.png"
        alt="not found logo"
        fill
      />
    </button>
  );
};

export default Logo;
