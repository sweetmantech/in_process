import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArtistsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount?: number;
  onPageChange: (page: number) => void;
}

const ArtistsPagination = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: ArtistsPaginationProps) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-neutral-500">
        Page {currentPage} of {totalPages}
        {totalCount !== undefined && (
          <>
            {" "}
            ·{" "}
            <span className="font-bold text-foreground">
              {totalCount.toLocaleString()} total artists
            </span>
          </>
        )}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ArtistsPagination;
