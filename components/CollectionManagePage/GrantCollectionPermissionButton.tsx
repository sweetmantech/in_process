"use client";

import useGrantCollectionPermissionByProtocol from "@/hooks/useGrantCollectionPermissionByProtocol";

const GrantCollectionPermissionButton = () => {
  const { grantPermission, isGranting } = useGrantCollectionPermissionByProtocol();

  return (
    <button
      onClick={grantPermission}
      disabled={isGranting}
      className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell transition-colors hover:bg-grey-moss-300 disabled:opacity-50"
    >
      {isGranting ? "Granting..." : "Grant Permission"}
    </button>
  );
};

export default GrantCollectionPermissionButton;
