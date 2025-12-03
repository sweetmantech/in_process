import { TableCell } from "@/components/ui/table";
import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/lib/supabase/types";

interface MomentCellProps {
  moment: Database["public"]["Tables"]["in_process_moments"]["Row"] & {
    collection: Database["public"]["Tables"]["in_process_collections"]["Row"];
  };
  className?: string;
}

const MomentCell = ({ moment, className }: MomentCellProps) => {
  const tokenUrl = `https://inprocess.fun/collect/base:${moment.collection.address}/${moment.token_id || 1}`;
  const { data: metadata, isLoading } = useMetadata(moment.uri);

  return (
    <TableCell className={className}>
      <a
        href={tokenUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 hover:opacity-90"
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <>
            {metadata?.image && (
              <Image
                src={getFetchableUrl(metadata.image) || ""}
                alt={metadata.name || "Moment"}
                width={48}
                height={48}
                className="rounded-md object-cover"
              />
            )}
            <div className="flex flex-col">
              {metadata?.name && (
                <span className="text-sm font-archivo-medium">{metadata.name}</span>
              )}
            </div>
          </>
        )}
      </a>
    </TableCell>
  );
};

export default MomentCell;
