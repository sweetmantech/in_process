import { useMomentProvider } from "@/providers/MomentProvider";
import { Address } from "viem";
import useInProcessGrantPermission from "./useInProcessGrantPermission";

// Grants PERMISSION_BIT_ADMIN to the smart wallet at the InProcess moment level (actual tokenId).
const useGrantInProcessMomentPermission = () => {
  const { moment } = useMomentProvider();
  return useInProcessGrantPermission(
    moment?.collectionAddress as Address | undefined,
    moment?.tokenId
  );
};

export default useGrantInProcessMomentPermission;
