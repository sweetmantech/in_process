"use client";

import { CreatePage } from "@/components/create-page";

export default function Create() {
  const handleSuccess = (tokenId: string) => {
    console.log(`Token ${tokenId} created successfully!`);
    // Optionally redirect to the token's page
    // router.push(`/token/${tokenId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Token</h1>
        <CreatePage
          onSuccess={handleSuccess}
          className="bg-white shadow-sm rounded-lg p-6"
        />
      </div>
    </div>
  );
}
