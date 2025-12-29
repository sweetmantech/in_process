import ContentRenderer from "../Renderers";
import { Skeleton } from "../ui/skeleton";
import CopyButton from "../CopyButton";
import { Address } from "viem";
import { TokenMetadataJson } from "@/lib/protocolSdk";

interface OverviewContentProps {
  metadata: TokenMetadataJson;
  name: string | null | undefined;
  address: Address;
  isLoading?: boolean;
}

const OverviewContent = ({ metadata, name, address, isLoading = false }: OverviewContentProps) => {
  const isPdf = metadata?.content?.mime?.includes("pdf") ?? false;
  const containerClassName = isPdf
    ? "w-fit pt-4 flex flex-col items-center gap-2"
    : "w-fit pt-4 flex flex-col items-center gap-2 md:flex-row";

  return (
    <div className={containerClassName}>
      <div className="relative aspect-[1/1] w-full md:w-fit md:max-w-[200px]">
        {isLoading ? <Skeleton className="size-full" /> : <ContentRenderer metadata={metadata} />}
      </div>
      <div className="space-y-2">
        <p className="font-archivo-medium text-xl md:text-4xl">{name}</p>
        <CopyButton text={address} />
      </div>
    </div>
  );
};

export default OverviewContent;
