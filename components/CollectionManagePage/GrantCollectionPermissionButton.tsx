"use client";

import useGrantCollectionPermission from "@/hooks/useGrantCollectionPermission";

const GrantCollectionPermissionButton = () => {
  const { grantPermission, isGranting, hasExternalWallet } = useGrantCollectionPermission();

  return (
    <button
      onClick={grantPermission}
      disabled={isGranting}
      className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell transition-colors hover:bg-grey-moss-300 disabled:opacity-50"
    >
      {isGranting ? "Granting..." : hasExternalWallet ? "Grant Permission" : "Connect Wallet"}
    </button>
  );
};

export default GrantCollectionPermissionButton;
