"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import useZoraMintComment from "@/hooks/useZoraMintComment";
import { useTokenProvider } from "@/providers/TokenProvider";

const CrossmintModal = dynamic(() => import("./CrossmintModal"), {
  loading: () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">Loading payment options...</div>
    </div>
  ),
  ssr: false,
});

export default function CommentButton() {
  const { setIsOpenCrossmint, isOpenCrossmint, mintComment, isLoading } =
    useZoraMintComment();
  const { setComment } = useTokenProvider();

  return (
    <>
      <button
        onClick={mintComment}
        className="py-3 bg-black font-grotesk-medium text-lg w-full text-tan-secondary"
        disabled={isLoading}
      >
        {isLoading ? "Collecting..." : "Collect"}
      </button>

      {isOpenCrossmint && (
        <Suspense fallback={<div>Loading...</div>}>
          <CrossmintModal
            onClose={() => {
              setIsOpenCrossmint(false);
              setComment("");
            }}
          />
        </Suspense>
      )}
    </>
  );
}
