"use client";

import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSignedAddress from "@/hooks/useSignedAddress";
import FeedbackModal from "./FeedbackModal";
import Link from "next/link";

const Footer = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const [clientRendered, setClientRendered] = useState(false);
  const signedAddress = useSignedAddress();

  useEffect(() => {
    setClientRendered(true);
  }, []);

  return (
    <main className="px-4 md:px-10 mx-auto w-screen overflow-x-hidden pb-16 md:py-16 relative z-[10]">
      <div className="my-8 h-[1px] bg-grey-moss-400 w-full w-full block md:hidden" />
      <div className="flex justify-between items-center">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          {clientRendered && (
            <Link href="/" aria-label="Go to homepage" className="mr-2">
              <Image
                src="/footer_logo.svg"
                blurDataURL="/footer_logo.png"
                alt="not found logo"
                width={isMobile ? 60 : 80}
                height={isMobile ? 60 : 80}
              />
            </Link>
          )}
          <p className="font-archivo-bold text-md !uppercase">© TOPIA</p>
        </div>
        <div className="flex flex-col items-end font-archivo-bold text-md">
          <button type="button" onClick={() => push("/create")}>
            create
          </button>
          <button
            type="button"
            onClick={() =>
              push(signedAddress ? `/${signedAddress}` : "/onboarding")
            }
          >
            timeline
          </button>
          <button type="button" onClick={() => push("/create/writing")}>
            write
          </button>
          <button type="button" onClick={() => push("/manifesto")}>
            manifesto
          </button>
          <FeedbackModal />
        </div>
      </div>
    </main>
  );
};

export default Footer;
