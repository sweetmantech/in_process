"use client";
import { useParams } from "next/navigation";
import Feed from "./Feed";
import { FadeIn } from "../ui/fade-in";

const ArtistPage = () => {
  const { artistAddress } = useParams();
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <FadeIn className="w-full max-w-4xl mx-auto flex flex-col items-center gap-2">
        <p className="text-2xl">{artistAddress}</p>
        <Feed />
      </FadeIn>
    </main>
  );
};

export default ArtistPage;
