"use client";
import { useMomentProvider } from "@/providers/MomentProvider";

const OwnerWarning = () => {
  const { isOwner } = useMomentProvider();

  if (isOwner) return null;

  return <p className="text-xs text-grey-moss-500">Only the contract owner can save changes.</p>;
};

export default OwnerWarning;
