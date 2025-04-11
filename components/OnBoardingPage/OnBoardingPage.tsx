"use client";

import { useInProcessFeedProvider } from "@/providers/InProcessFeedProvider";
import Image from "next/image";
import FeedItem from "./FeedItem";
import useConnectedWallet from "@/hooks/useConnectedWallet";
import { redirect } from "next/navigation";
import { useAccount } from "wagmi";
import { useFrameProvider } from "@/providers/FrameProvider";

const OnBoardingPage = () => {
  const { feeds } = useInProcessFeedProvider();
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const { context } = useFrameProvider();
  const signedWallet = context ? address : connectedWallet;
  if (signedWallet) redirect("/");
  return (
    <div className="w-screen flex flex-col items-center pt-[200px]">
      <p className="font-archivo text-5xl">A Collective Onchain Timeline</p>
      <p className="font-spectral-italic text-4xl pt-4">for artists</p>
      <Image
        alt="not found ico"
        width={108}
        height={108}
        unoptimized
        src={"/diamond.svg"}
        className="mt-16"
      />
      <div className="w-full grid grid-cols-3">
        {feeds.slice(0, 3).map((feed, i) => (
          <FeedItem key={i} feed={feed} />
        ))}
      </div>
    </div>
  );
};

export default OnBoardingPage;
