import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import getTotalEarnings from "@/lib/viem/getTotalEarnings";

const useTotalEarnings = () => {
  const { connectedAddress } = useUserProvider();

  return useQuery({
    queryKey: ["totalEarnings", connectedAddress],
    queryFn: () => getTotalEarnings(connectedAddress as `0x${string}`),
    enabled: Boolean(connectedAddress),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });
};

export default useTotalEarnings;
