"use client";
import { useParams } from "next/navigation";
import Feed from "./Feed";
import { FadeIn } from "../ui/fade-in";
import BgNoiseWrapper from "../ui/texture-wrapper";
import EnsName from "../EnsName";
import { Address } from "viem";

const ArtistPage = () => {
  const { artistAddress } = useParams();
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gradientTopRightLight">
      <BgNoiseWrapper url="/egg-shell-noise.png">
        <div className="min-w-[650px] max-w-4xl mx-auto relative py-20 overflow-hidden min-h-screen flex flex-col">
          <EnsName
            className="text-2xl md:text-6xl font-bold mt-20"
            address={artistAddress as Address}
          />
          <FadeIn className="w-full grow flex items-center justify-center pb-20 mb-20">
            <Feed />
          </FadeIn>
        </div>
      </BgNoiseWrapper>
    </main>
  );
};

export default ArtistPage;
