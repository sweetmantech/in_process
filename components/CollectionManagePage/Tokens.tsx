import Loading from "../Loading";
import TokenItem from "./TokenItem";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const Tokens = () => {
  const { tokens } = useCollectionProvider();
  const { isLoading, data } = tokens;

  if (isLoading)
    return (
      <div className="grow flex items-center justify-center">
        <Loading className="w-[180px] aspect-[1/1] md:w-[300px]" />
      </div>
    );
  if (data)
    return (
      <div className="grow w-full grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-10 pt-6">
        {data.map((t: any, i: number) => (
          <TokenItem t={t} key={i} />
        ))}
      </div>
    );
};

export default Tokens;
