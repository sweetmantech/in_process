"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FeedbackModal from "./FeedbackModal";
import Link from "next/link";

const Footer = () => {
  const { push } = useRouter();
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  return (
    <main className="px-4 md:px-10 mx-auto w-screen overflow-x-hidden pb-16 md:py-16 relative z-[10]">
      {/* top divider for mobile */}
      <div className="my-8 h-[1px] bg-grey-moss-400 w-full block md:hidden" />

      {/* Shared responsive layout */}
      <div className="flex items-start md:items-center gap-4">
        {/* Logo & copyright */}
        <div className="flex flex-col items-start md:items-center">
          {clientRendered && (
            <Link href="/" aria-label="Go to homepage" className="mb-2 md:mb-0">
              <Image
                src="/footer_logo.svg"
                blurDataURL="/footer_logo.png"
                alt="footer logo"
                width={70}
                height={70}
              />
            </Link>
          )}
          <p className="font-archivo-bold text-md !uppercase">© TOPIA</p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col font-archivo-bold text-md space-y-1 text-left md:text-right items-start md:items-end">
          <button type="button" onClick={() => push("/manifesto")}>
            manifesto
          </button>
          <button type="button" onClick={() => push("/faq")}>
            faq
          </button>
          <FeedbackModal />
        </div>

        {/* Icons row */}
        <div className="flex flex-row gap-2 items-center ml-auto">
          <a
            href="https://x.com/stayinprocess"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="block"
          >
            <Image src="/images/x.svg" alt="X icon" width={36} height={36} />
          </a>
          <a
            href="https://warpcast.com/callmelatasha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Farcaster"
            className="block"
          >
            <Image
              src="/images/farcaster.svg"
              alt="Farcaster icon"
              width={36}
              height={36}
            />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Footer;
