"use client";

import { useCollectionProvider } from "@/providers/CollectionProvider";
import useZoraMintComment from "@/hooks/useZoraMintComment";
import CrossmintModal from "./CrossmintModal";

export default function CommentButton() {
  const { setIsOpenCrossmint, isOpenCrossmint, mintComment, isLoading } =
    useZoraMintComment();
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
        disabled={isLoading}
      >
        {isLoading ? "Minting..." : "Leave a Comment"}
      </button>

      {isOpenCrossmint && <CrossmintModal onClose={() => setIsOpenCrossmint(false)} />}
    </>
  );
}
