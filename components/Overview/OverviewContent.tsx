import CopyButton from "../CopyButton";
import { Address } from "viem";
import { MomentMetadata } from "@/types/moment";
import Preview from "../MomentsGrid/Preview";

interface OverviewContentProps {
  metadata: MomentMetadata | null | undefined;
  name: string | null | undefined;
  address: Address;
}

const OverviewContent = ({ metadata, name, address }: OverviewContentProps) => {
  return (
    <div className="w-fit pt-4 flex flex-col items-center gap-2 md:flex-row">
      <div className="relative aspect-[1/1] w-24 bg-grey-moss-50 flex items-center justify-center">
        {metadata ? (
          <Preview data={metadata} />
        ) : (
          <p className="text-xs text-grey-moss-200">No Preview</p>
        )}
      </div>
      <div className="space-y-2">
        <p
          className={`font-archivo-medium text-xl md:text-4xl truncate min-w-0 max-w-[200px] ${!metadata ? "text-grey-moss-200" : ""}`}
        >
          {metadata ? name : "Unknown"}
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
