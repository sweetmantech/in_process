"use client";
import { useTokenProvider } from "@/providers/TokenProvider";

const OwnerWarning = () => {
  const { isOwner } = useTokenProvider();

  if (isOwner) return null;

  return <p className="text-xs text-grey-moss-500">Only the contract owner can save changes.</p>;
};

export default OwnerWarning;
