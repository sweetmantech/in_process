"use client";

import { useParams } from "next/navigation";

export default function CollectionPage() {
  const params = useParams();
  const collection = params.collection as string;

  // Split the collection parameter into chain and address
  const [chain, address] = collection.split("%3A");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Collection Details</h1>
      <div className="space-y-2">
        <p>Chain: {chain}</p>
        <p>Contract Address: {address}</p>
      </div>
    </div>
  );
}
