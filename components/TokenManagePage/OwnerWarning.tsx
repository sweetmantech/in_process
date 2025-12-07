"use client";
import { useMomentProvider } from "@/providers/MomentProvider";

const OwnerWarning = () => {
  const { isOwner } = useMomentProvider();

  if (isOwner) return null;

  return <p className="text-grey-moss-500 text-xs">Only the contract owner can save changes.</p>;
};

export default OwnerWarning;
