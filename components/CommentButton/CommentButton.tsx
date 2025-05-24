"use client";

import { useZoraMintCommentProvider } from "@/providers/ZoraMintCommentProvider";

export default function CommentButton() {
  const { mintComment, isLoading } = useZoraMintCommentProvider();

  return (
    <button
      onClick={mintComment}
      type="button"
      className="py-3 bg-black hover:bg-grey-moss-300 font-archivo text-xl w-full text-grey-eggshell"
      disabled={isLoading}
    >
      {isLoading ? "collecting..." : "collect"}
    </button>
  );
}
