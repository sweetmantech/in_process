"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

const CrossmintModal = dynamic(() => import("./CrossmintModal"), {
  loading: () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">Loading payment options...</div>
    </div>
  ),
  ssr: false,
});

export default function CommentButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Leave a Comment
      </button>

      {isOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <CrossmintModal onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
