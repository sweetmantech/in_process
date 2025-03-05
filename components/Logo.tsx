"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  className?: string;
}
const Logo = ({ className = "" }: LogoProps) => {
  const { push } = useRouter();

  return (
    <button className={className} type="button" onClick={() => push("/")}>
      <Image src={"/logo.png"} alt="not found logo" width={128} height={29} />
    </button>
  );
};

export default Logo;
