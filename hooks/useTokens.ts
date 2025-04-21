import delay from "@/lib/delay";
import { useQuery } from "@tanstack/react-query";

const fetchTokens = async (collections: any) => {
  while (1) {
    const response = await fetch("/api/dune/tokens", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        collections,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    await delay(1000);
  }
};

const useTokens = (collections: any) => {
  return useQuery({
    queryKey: ["tokens", collections],
    queryFn: () => fetchTokens(collections),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });
};

export default useTokens;
