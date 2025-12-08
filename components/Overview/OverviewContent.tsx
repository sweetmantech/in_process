import ContentRenderer from "../Renderers";
import { Skeleton } from "../ui/skeleton";
import { MomentMetadata } from "@/types/moment";
import CopyButton from "../CopyButton";
import { Address } from "viem";
import { usePdfContainerClassName } from "@/hooks/usePdfContainerClassName";

interface OverviewContentProps {
  metadata: MomentMetadata | null | undefined;
  name: string | null | undefined;
  address: Address;
  isLoading?: boolean;
}

const OverviewContent = ({ metadata, name, address, isLoading = false }: OverviewContentProps) => {
  const containerClassName = usePdfContainerClassName(metadata);

  return (
    <div className={containerClassName}>
      <div className="relative aspect-[1/1] w-full md:w-fit md:max-w-[200px]">
        {isLoading ? (
          <Skeleton className="size-full" />
        ) : (
          <ContentRenderer metadata={metadata as MomentMetadata} />
        )}
      </div>
      <div className="space-y-2">
        <p className="font-archivo-medium text-xl md:text-4xl">{name}</p>
        <CopyButton address={address} />
      </div>
    </div>
  );
};

export default OverviewContent;
