import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import TokenItem from "./TokenItem";

const Tokens = () => {
  const { moments } = useTimelineApiContext();

  if (moments)
    return (
      <div className="grow w-full grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-10 pt-6">
        {moments.map((t: any, i: number) => (
          <TokenItem t={t} key={i} />
        ))}
      </div>
    );
};

export default Tokens;
