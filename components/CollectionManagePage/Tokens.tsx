import Loading from "../Loading";
import TokenItem from "./TokenItem";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const Tokens = () => {
  const { tokens } = useCollectionProvider();
  const { isLoading, data } = tokens;

  if (isLoading)
    return (
      <div className="flex grow items-center justify-center">
        <Loading className="aspect-[1/1] w-[180px] md:w-[300px]" />
      </div>
    );
  if (data)
    return (
      <div className="grid w-full grow grid-cols-1 gap-4 px-4 pt-6 md:grid-cols-4 md:px-10">
        {data.map((t: any, i: number) => (
          <TokenItem t={t} key={i} />
        ))}
      </div>
    );
};

export default Tokens;
