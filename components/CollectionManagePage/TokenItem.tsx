import { useMetadata } from "@/hooks/useMetadata";
import { Token } from "@/types/token";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

const TokenItem = ({ t }: { t: Token }) => {
  const { data, isLoading } = useMetadata(t.uri);

  const handleClick = () => {
    return;
  };

  if (isLoading) return <div></div>;
  if (data)
    return (
      <button
        type="button"
        className="col-span-1 aspect-video h-fit bg-grey-moss-300 rounded-lg overflow-hidden"
        onClick={handleClick}
      >
        <div className="w-full h-2/3 overflow-hidden relative">
          <div className="absolute z-[10] bg-white/30 backdrop-blur-[4px] size-full left-0 top-0" />
          <Image
            src={getFetchableUrl(data.image) || "/images/placeholder.png"}
            alt="not found img"
            unoptimized
            className="absolute z-[1]"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </div>
        <div className="h-1/3 px-4 py-2 flex gap-6 items-center">
          <p className="font-archivo text-white text-left">{data?.name}</p>
          <p className="font-archivo text-sm text-grey text-left bg-grey-moss-100 rounded-md px-2">
            Token {t.tokenId}
          </p>
        </div>
      </button>
    );
};

export default TokenItem;
