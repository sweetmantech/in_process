import { TableCell } from "@/components/ui/table";
import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Skeleton } from "@/components/ui/skeleton";
import type { InProcessPayment } from "@/types/payments";
import { SITE_ORIGINAL_URL } from "@/lib/consts";

interface MomentCellProps {
  moment: InProcessPayment["moment"];
  className?: string;
}

const MomentCell = ({ moment, className }: MomentCellProps) => {
  const tokenUrl = `${SITE_ORIGINAL_URL}/collect/base:${moment.collection.address}/${moment.token_id}`;
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
                src={getFetchableUrl(metadata.image) || "/images/placeholder.png"}
                alt={metadata.name || "Moment"}
                width={48}
                height={48}
                className="rounded-md object-cover"
              />
            )}
            <div className="flex flex-col">
              {metadata?.name && (
                <span className="font-archivo-medium text-sm">{metadata.name}</span>
              )}
            </div>
          </>
        )}
      </a>
    </TableCell>
  );
};

export default MomentCell;
