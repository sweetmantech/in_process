"use client";

import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";

export default function CommentButton() {
  const { collectWithComment, isLoading } = useMomentCollectProvider();

  return (
    <button
      onClick={collectWithComment}
      type="button"
      className="py-3 bg-black hover:bg-grey-moss-300 font-archivo text-xl w-full text-grey-eggshell"
      disabled={isLoading}
    >
      {isLoading ? "collecting..." : "collect"}
    </button>
  );
}
