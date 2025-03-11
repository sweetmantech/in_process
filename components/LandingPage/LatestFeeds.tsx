import truncateAddress from "@/lib/truncateAddress";
import { Collection } from "@/types/token";
import Image from "next/image";

interface LatestFeedsProps {
  feeds: Collection[];
}

const LatestFeeds = ({ feeds }: LatestFeedsProps) => {
  return (
    <div className="pt-4 block md:hidden w-full">
      <div className="flex justify-center">
        <Image
          src="/star.svg"
          blurDataURL="/star.png"
          width={23}
          height={23}
          alt="not found start"
        />
      </div>
      {feeds.map((ele, i) => (
        <div className="flex items-start justify-between p-4" key={i}>
          <div>
            <p className="font-spectral text-base">{ele.name}</p>
            <p className="font-archivo text-[11px]">
              {new Date(ele.released_at).toLocaleString()}
            </p>
          </div>
          <p className="font-archivo text-sm">{truncateAddress(ele.creator)}</p>
        </div>
      ))}
    </div>
  );
};

export default LatestFeeds;
