import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import getTotalEarnings from "@/lib/viem/getTotalEarnings";

const useTotalEarnings = () => {
  const { socialWalletAddress } = useUserProvider();

  return useQuery({
    queryKey: ["totalEarnings", socialWalletAddress],
    queryFn: () => getTotalEarnings(socialWalletAddress as `0x${string}`),
    enabled: Boolean(socialWalletAddress),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });
};

export default useTotalEarnings;
