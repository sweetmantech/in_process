"use client";

import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Footer = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  return (
    <main className="px-4 md:px-10 mx-auto w-screen overflow-x-hidden pb-16 md:py-16 relative z-[10]">
      <div className="my-8 h-[1px] bg-grey-moss-400 w-full w-full block md:hidden" />
      <div className="flex justify-between items-center">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="w-[40px] md:w-[80px] h-[80px] md:aspect-[1/1] relative">
            {clientRendered && (
              <Image
                src={
                  isMobile
                    ? "/mobile_footer_logo.svg"
                    : "/desktop_footer_logo.svg"
                }
                blurDataURL={
                  isMobile
                    ? "/mobile_footer_logo.png"
                    : "/desktop_footer_logo.png"
                }
                alt="not found logo"
                fill
              />
            )}
          </div>
          <p className="font-archivo-bold text-md !uppercase">© TOPIA</p>
        </div>
        <div className="flex flex-col items-end font-archivo-bold text-md">
          <button type="button" onClick={() => push("/create")}>
            create
          </button>
          <button type="button" onClick={() => push("/create/writing")}>
            write
          </button>
          <button type="button" onClick={() => push("/manifesto")}>
            manifesto
          </button>
        </div>
      </div>
    </main>
  );
};

export default Footer;
