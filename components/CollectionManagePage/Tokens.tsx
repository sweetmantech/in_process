import { useTokensProvider } from "@/providers/TokensProvider";
import Loading from "../Loading";
import { Token } from "@/types/token";
import TokenItem from "./TokenItem";

const Tokens = () => {
  const { data, isLoading } = useTokensProvider();

  if (isLoading)
    return (
      <div className="grow flex items-center justify-center">
        <Loading className="w-[180px] aspect-[1/1] md:w-[300px]" />
      </div>
    );
  if (data)
    return (
      <div className="grow w-full grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-10 pt-6">
        {data.map((t: Token, i: number) => (
          <TokenItem t={t} key={i} />
        ))}
      </div>
    );
};

export default Tokens;
