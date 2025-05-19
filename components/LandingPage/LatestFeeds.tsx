import { Token } from "@/types/token";
import Image from "next/image";
import truncated from "@/lib/truncated";
import { useMetadata } from "@/hooks/useMetadata";
import { useRouter } from "next/navigation";
import { useInProcessProvider } from "@/providers/InProcessProvider";
import truncateAddress from "@/lib/truncateAddress";

const Feed = ({ feed }: { feed: Token }) => {
  const { data } = useMetadata(feed.uri);
  const { push } = useRouter();
  const { profiles } = useInProcessProvider();
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
      <p className="font-archivo text-sm">
        {profiles[`${feed.creator}`]?.username || truncateAddress(feed.creator)}
      </p>
    </button>
  );
};
const LatestFeeds = () => {
  const { feeds } = useInProcessProvider();
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
