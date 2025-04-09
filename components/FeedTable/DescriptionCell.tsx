import { useMetadata } from "@/hooks/useMetadata";
import { Skeleton } from "../ui/skeleton";

interface DescriptionCellProps {
  uri: string;
}
const DescriptionCell = ({ uri }: DescriptionCellProps) => {
  const { isLoading, data } = useMetadata(uri);
  if (isLoading) return <Skeleton className="h-4 w-12" />;

  return (
    <p>
      {data?.name
        ? `${data.name.slice(0, 60)} ${data.name.length > 60 ? "..." : ""}`
        : ""}
    </p>
  );
};

export default DescriptionCell;
