import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import getUsername from "../lib/getUsername";

/**
 * Fetches the username for a given wallet address using getUsername.
 * Returns username, loading, and error states via React Query.
 */
const useUsername = (address: Address) => {
  return useQuery({
    queryKey: ["username", address],
    queryFn: () => getUsername(address),
    enabled: !!address,
  });
};

export default useUsername;
