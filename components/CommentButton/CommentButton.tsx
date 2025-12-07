"use client";

import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";

export default function CommentButton() {
  const { collectWithComment, isLoading } = useMomentCollectProvider();

  return (
    <button
      onClick={collectWithComment}
      type="button"
      className="w-full bg-black py-3 font-archivo text-xl text-grey-eggshell hover:bg-grey-moss-300"
      disabled={isLoading}
    >
      {isLoading ? "collecting..." : "collect"}
    </button>
  );
}
