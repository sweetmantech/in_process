"use client";

import useGrantMomentPermission from "@/hooks/useGrantMomentPermission";

const GrantMomentPermissionButton = () => {
  const { grantPermission, isGranting } = useGrantMomentPermission();

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
