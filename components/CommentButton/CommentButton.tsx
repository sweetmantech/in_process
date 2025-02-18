"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import useZoraMintComment from "@/hooks/useZoraMintComment";

const CrossmintModal = dynamic(() => import("./CrossmintModal"), {
  loading: () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">Loading payment options...</div>
    </div>
  ),
  ssr: false,
});

export default function CommentButton() {
  const { setIsOpenCrossmint, isOpenCrossmint, mintComment } = useZoraMintComment()
  const { styling } = useCollectionProvider();

  return (
    <>
      <button
        onClick={mintComment}
        className={`px-4 py-2 rounded-lg hover:opacity-80 transition-opacity`}
        style={{
          backgroundColor: styling?.theme?.color?.accent || "#3B82F6",
          color: styling?.theme?.color?.accentText || "white",
        }}
      >
        Leave a Comment
      </button>

      {isOpenCrossmint && (
        <Suspense fallback={<div>Loading...</div>}>
          <CrossmintModal onClose={() => setIsOpenCrossmint(false)} />
        </Suspense>
      )}
    </>
  );
}
