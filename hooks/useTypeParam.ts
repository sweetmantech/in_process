import { useSearchParams } from "next/navigation";

const useTypeParam = (): string | null => {
  const searchParams = useSearchParams();
  return searchParams.get("type");
};

export default useTypeParam;
