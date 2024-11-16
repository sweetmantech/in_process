"use client";

import FeedPage from "@/components/FeedPage";
import { useParams } from "next/navigation";
import { Address } from "viem";

export default function CollectionPage() {
  const params = useParams();
  const collection = params.collection as string;
  const [chain, address] = collection.split("%3A");
  return <FeedPage chainId={Number(chain)} address={address as Address} />;
}
