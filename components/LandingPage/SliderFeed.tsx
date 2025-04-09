import { useMetadata } from "@/hooks/useMetadata";
import { Collection } from "@/types/token";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import ContentRenderer from "../Token/ContentRenderer";

interface SliderFeedProps {
  feed: Collection;
}

const SliderFeed = ({ feed }: SliderFeedProps) => {
  const { data, isLoading } = useMetadata(feed.contractURI);
  const { push } = useRouter();

  const handleClick = () => {
    push(`/${feed.defaultAdmin}`);
  };

  return (
    <button
      className="w-full h-[200px] md:h-auto aspect-video overflow-hidden relative rounded-md bg-tan-400"
      type="button"
      onClick={handleClick}
    >
      {isLoading || !data ? (
        <div className="size-full flex justify-center items-center bg-tan-secondary border border-grey rounded-md">
          <Loading className="size-3/4" />
        </div>
      ) : (
        <ContentRenderer metadata={data} />
      )}
    </button>
  );
};
export default SliderFeed;
