"use client";
import { useParams } from "next/navigation";
import { useArtistFeed } from "@/hooks/useArtistFeed";
import HorizontalFeed from "../HorizontalFeed";

const ArtistPage = () => {
  const { artistAddress } = useParams();
  const { feed } = useArtistFeed();
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      {artistAddress}
      {feed.length > 0 && <HorizontalFeed feed={feed} />}
    </main>
  );
};

export default ArtistPage;
