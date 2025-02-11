"use client";
import { useParams } from "next/navigation";

const ArtistPage = () => {
  const { artistAddress } = useParams();
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      {artistAddress}
    </main>
  );
};

export default ArtistPage;
