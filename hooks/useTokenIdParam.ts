import { useSearchParams } from "next/navigation";

const useTokenIdParam = () => {
  const searchParams = useSearchParams();
  const tokenId = searchParams.get("tokenId") as string;
  return tokenId;
};

export default useTokenIdParam;
