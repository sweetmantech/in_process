import { Token } from "@/types/token";
import Image from "next/image";
import truncated from "@/lib/truncated";
import ArtistName from "../ArtistName";
import { useInProcessFeedProvider } from "@/providers/InProcessFeedProvider";
import { useMetadata } from "@/hooks/useMetadata";
import { useRouter } from "next/navigation";

const Feed = ({ feed }: { feed: Token }) => {
  const { data } = useMetadata(feed.uri);
  const { push } = useRouter();

  return (
    <button
      type="button"
      className="w-full flex items-start justify-between p-4"
      onClick={() => push(`/${feed.creator}`)}
    >
      <div className="">
        <p className="font-spectral-italic text-base">
          {truncated(data?.name || "")}
        </p>
        <p className="font-archivo text-[11px] text-left">
          {new Date(feed.released_at).toLocaleString()}
        </p>
      </div>
      <ArtistName className="font-archivo text-sm" address={feed.creator} />
    </button>
  );
};
const LatestFeeds = () => {
  const { feeds } = useInProcessFeedProvider();
  return (
    <div className="block md:hidden w-full">
      <div className="flex justify-center">
        <Image
          src="/moon.svg"
          blurDataURL="/moon.png"
          width={39}
          height={36}
          alt="not found moon"
        />
      </div>
      {feeds.slice(0, 3).map((feed, i) => (
        <Feed key={i} feed={feed} />
      ))}
    </div>
  );
};

export default LatestFeeds;
