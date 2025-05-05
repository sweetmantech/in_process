"use client";

import { useInProcessFeedProvider } from "@/providers/InProcessFeedProvider";
import Image from "next/image";
import FeedItem from "./FeedItem";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useUserProvider } from "@/providers/UserProvider";

const OnBoardingPage = () => {
  const { feeds } = useInProcessFeedProvider();
  const { connectedAddress } = useUserProvider();

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
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 px-4 md:px-10">
        {feeds.slice(0, 3).map((feed, i) => (
          <FeedItem key={i} feed={feed} />
        ))}
      </div>
    </div>
  );
};

export default OnBoardingPage;
