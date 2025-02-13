"use client";
import { useParams } from "next/navigation";
import Feed from "./Feed";
import { FadeIn } from "../ui/fade-in";
import BgNoiseWrapper from "../ui/texture-wrapper";

const ArtistPage = () => {
  const { artistAddress } = useParams();
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gradientTopRightLight">
      <BgNoiseWrapper url="/egg-shell-noise.png">
        <div className="w-full min-w-[680px] flex flex-col items-center justify-end relative overflow-hidden h-[300px] translate-y-[-100px]">
          <FadeIn>
            <p className="text-2xl">{artistAddress}</p>
          </FadeIn>
          <FadeIn className="w-full">
            <Feed />
          </FadeIn>
        </div>
      </BgNoiseWrapper>
    </main>
  );
};

export default ArtistPage;
