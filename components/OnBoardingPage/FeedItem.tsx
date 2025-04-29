import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Token } from "@/types/token";
import Image from "next/image";
import Loading from "../Loading";
import ArtistName from "../ArtistName";
<<<<<<< HEAD
=======
import truncated from "@/lib/truncated";
>>>>>>> 89dfe03ef3fa55417fc34f0d1b1070dc2e0cc001

interface FeedItemProps {
  feed: Token;
}

const FeedItem = ({ feed }: FeedItemProps) => {
  const { data, isLoading } = useMetadata(feed.uri);
<<<<<<< HEAD
  console.log('Metadata data:', data);
=======

>>>>>>> 89dfe03ef3fa55417fc34f0d1b1070dc2e0cc001
  if (isLoading)
    return (
      <div className="w-full aspect-video bg-grey-moss-100 rounded-lg flex items-center justify-center mt-14">
        <Loading className="size-full" />
      </div>
    );
  return (
<<<<<<< HEAD
    <div className="flex flex-col">
      <div className="w-full aspect-video relative bg-grey-moss-100">
        <Image
          src={getFetchableUrl(data?.image) || ""}
          alt="not found img"
          fill
          objectFit="contain"
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <p className="font-spectral-medium-italic text-sm md:text-lg">{data?.name}</p>
          <ArtistName className="font-archivo-medium text-sm md:text-[16px]" address={feed.creator} />
        </div>
          <p className="font-archivo-medium text-xs md:text-[16px] mt-1 md:mt-0">{new Date(feed.released_at).toLocaleString()}</p>
      </div>
=======
    <div className="w-full">
      <div className="w-full aspect-video relative mt-14 bg-grey-moss-100">
        <Image
          src={getFetchableUrl(data?.image) || ""}
          alt="not found img"
          objectFit="contain"
          objectPosition="center"
          layout="fill"
          className="absolute"
        />
      </div>
      <div className="flex justify-between items-center pt-4">
        <p className="font-spectral-medium-italic">
          {truncated(data?.name || "")}
        </p>
        <ArtistName address={feed.creator} className="!font-archivo-medium" />
      </div>
      <p className="font-archivo">
        {new Date(feed.released_at).toLocaleString()}
      </p>
>>>>>>> 89dfe03ef3fa55417fc34f0d1b1070dc2e0cc001
    </div>
  );
};

export default FeedItem;
