"use client";

import FeedPage from "@/components/FeedPage";
import { useParams } from "next/navigation";

export default function CollectionPage() {
  const params = useParams();
  const collection = params.collection as string;
  const [chain, address] = collection.split("%3A");
  return <FeedPage chain={chain} address={address} />;
}
