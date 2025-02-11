"use client";
import { useParams } from "next/navigation";
import ArtistFeed from "./ArtistFeed";

const ArtistPage = () => {
  const { artistAddress } = useParams();
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      {artistAddress}
      <ArtistFeed />
    </main>
  );
};

export default ArtistPage;
