"use client";
import { useParams } from "next/navigation";
import Feed from "./Feed";
import { FadeIn } from "../ui/fade-in";
import EnsName from "../EnsName";
import { Address } from "viem";

const ArtistPage = () => {
  const { artistAddress } = useParams();
  return (
    <main className="isolate min-h-screen overflow-hidden">
      <div className="mx-10 relative overflow-hidden min-h-screen flex flex-col">
        <EnsName
          className="text-2xl md:text-6xl font-bold absolute top-[30vh] left-20"
          address={artistAddress as Address}
        />
        <FadeIn className="w-full grow flex flex-col items-center justify-center">
          <Feed />
        </FadeIn>
      </div>
    </main>
  );
};

export default ArtistPage;
