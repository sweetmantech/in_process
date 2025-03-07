"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const { push } = useRouter();

  return (
    <main className="w-screen flex justify-between items-center pl-10 pr-14 pt-24 pb-16 relative z-[10]">
      <div className="flex items-center">
        <Image
          src="/footer_logo.png"
          alt="not found logo"
          width={80}
          height={80}
        />
        <p className="font-archivo-bold text-md">© XYZ Partners</p>
      </div>
      <div className="flex flex-col items-end font-archivo-bold text-md">
        <button
          type="button"
          onClick={() => push("/create?writing_mode=enabled")}
        >
          write
        </button>
        <button type="button" onClick={() => push("/create")}>
          create
        </button>
        <button type="button" onClick={() => push("/manifesto")}>
          manifesto
        </button>
      </div>
    </main>
  );
};

export default Footer;
