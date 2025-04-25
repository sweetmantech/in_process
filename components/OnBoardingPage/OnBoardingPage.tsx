"use client";

import { useInProcessFeedProvider } from "@/providers/InProcessFeedProvider";
import Image from "next/image";
import FeedItem from "./FeedItem";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import { redirect } from "next/navigation";
import { useAccount } from "wagmi";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useEffect } from "react";
import { Button } from "../ui/button";

const OnBoardingPage = () => {
  const { feeds } = useInProcessFeedProvider();
  const { connectedWallet } = useConnectedWallet();
  const { address, isConnected } = useAccount();
  const { context } = useFrameProvider();
  const signedWalletAddress = context
    ? isConnected
      ? address
      : null
    : connectedWallet;

  useEffect(() => {
    if (signedWalletAddress) redirect("/");
  }, [signedWalletAddress]);

  return (
    <div className="w-screen flex flex-col items-center pt-12 md:pt-[160px]">
      <p className="font-archivo text-3xl md:text-5xl">A Collective Onchain Timeline</p>
      <p className="font-spectral-italic text-3xl md:text-4xl pt-8">for artists</p>
      <Image
        alt="not found ico"
        width={108}
        height={108}
        unoptimized
        src={"/diamond.svg"}
        className="mt-16"
      />
      <Button onClick={() => redirect("/create")} className="mt-16 px-14 py-2 h-12 text-md bg-grey-moss-900 hover:bg-grey-moss-300 text-[#FFF9EA] text-[22px] font-normal rounded-sm">create</Button>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 px-8 mt-16">
        {feeds.slice(0, 3).map((feed, i) => (
          <FeedItem key={i} feed={feed} />
        ))}
      </div>
    </div>
  );
};

export default OnBoardingPage;
