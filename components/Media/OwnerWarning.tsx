"use client";

import { useUserProvider } from "@/providers/UserProvider";

interface OwnerWarningProps {
  isOwner: boolean;
}

const OwnerWarning = ({ isOwner }: OwnerWarningProps) => {
  const { artistWalletLoaded } = useUserProvider();

  if (!artistWalletLoaded || isOwner) return null;

  return <p className="text-grey-moss-500 text-xs">Only the contract owner can save changes.</p>;
};

export default OwnerWarning;
