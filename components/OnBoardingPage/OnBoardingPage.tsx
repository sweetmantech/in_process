"use client";

import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import FeedTable from "../FeedTable";

const OnBoardingPage = () => {
  const { connectedAddress } = useUserProvider();
  const { push } = useRouter();

  useEffect(() => {
    if (connectedAddress) redirect("/");
  }, [connectedAddress]);

  return (
    <div className="w-screen flex flex-col items-center pt-12 md:pt-[200px]">
      <p className="font-archivo-medium text-2xl md:text-5xl text-center">
        A Collective Onchain Timeline
      </p>
      <p className="font-spectral-italic text-4xl pt-4">for artists</p>
      <Image
        alt="not found ico"
        width={274}
        height={44}
        unoptimized
        src="/brand.svg"
        blurDataURL="/brand.png"
        className="mt-16"
      />
      <div className="py-12">
        <button
          onClick={() => push("/create")}
          type="button"
          className="text-xl w-[168px] py-1 bg-grey-moss-900 hover:bg-grey-moss-300 font-archivo text-tan-primary rounded-sm"
        >
          start
        </button>
      </div>
      <div className="max-w-6xl w-full px-12">
        <FeedTable />
      </div>
    </div>
  );
};

export default OnBoardingPage;
