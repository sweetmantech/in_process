"use client";

import useGrantInProcessMomentPermission from "@/hooks/useGrantInProcessMomentPermission";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Protocol } from "@/types/moment";

const GrantMomentPermissionButton = () => {
  const { data } = useCollectionProvider();
  const { grantPermission, isGranting } = useGrantInProcessMomentPermission();

  if (data?.protocol && data.protocol !== Protocol.InProcess) return null;

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

export default GrantMomentPermissionButton;
