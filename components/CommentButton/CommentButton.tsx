"use client";

import { useZoraMintCommentProvider } from "@/providers/ZoraMintCommentProvider";

export default function CommentButton() {
  const { mintComment, isLoading } = useZoraMintCommentProvider();

  return (
    <>
      <button
        onClick={mintComment}
        className="py-3 bg-black font-archivo text-xl w-full text-tan-secondary"
        disabled={isLoading}
      >
        {isLoading ? "collecting..." : "collect"}
      </button>
    </>
  );
}
