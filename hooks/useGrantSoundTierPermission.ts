import { useMomentProvider } from "@/providers/MomentProvider";
import { Address } from "viem";
import useSoundEditionGrantRoles from "./useSoundEditionGrantRoles";

// Grants ADMIN_ROLE to the smart wallet for a Sound.xyz tier (moment).
// Sound.xyz has no per-tier permission model — tier is a uint8 concept within the edition.
// Admin is granted at the edition (collectionAddress) level, which covers all tiers.
const useGrantSoundTierPermission = () => {
  const { moment } = useMomentProvider();
  return useSoundEditionGrantRoles(moment?.collectionAddress as Address | undefined);
};

export default useGrantSoundTierPermission;
