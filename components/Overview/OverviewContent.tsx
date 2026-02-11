import ContentRenderer from "../Renderers";
import CopyButton from "../CopyButton";
import { Address } from "viem";
import { TokenMetadataJson } from "@/lib/protocolSdk";

interface OverviewContentProps {
  metadata: TokenMetadataJson;
  name: string | null | undefined;
  address: Address;
}

const OverviewContent = ({ metadata, name, address }: OverviewContentProps) => {
  const isPdf = metadata?.content?.mime?.includes("pdf") ?? false;
  const containerClassName = isPdf
    ? "w-fit pt-4 flex flex-col items-center gap-2"
    : "w-fit pt-4 flex flex-col items-center gap-2 md:flex-row";

  return (
    <div className={containerClassName}>
      <div className="relative aspect-[1/1] w-24">
        <ContentRenderer metadata={metadata} />
      </div>
      <div className="space-y-2">
        <p className="font-archivo-medium text-xl md:text-4xl truncate min-w-0 max-w-[200px]">
          {name}
        </p>
        <CopyButton
          text={address}
          className="bg-grey-moss-50 px-3 py-1 text-xs text-grey-moss-200 hover:text-grey-moss-400"
        />
      </div>
    </div>
  );
};

export default OverviewContent;
