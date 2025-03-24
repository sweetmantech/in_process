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
      {data?.description
        ? `${data.description.slice(0, 60)} ${data.description.length > 60 && "..."}`
        : ""}
    </p>
  );
};

export default DescriptionCell;
