import { Skeleton } from "@/components/ui/skeleton";
import PaymentsTableLoading from "./PaymentsTableLoading";

const PaymentsPageSkeleton = () => (
  <main className="flex flex-col gap-4 font-archivo">
    <div className="flex justify-end">
      <Skeleton className="h-10 w-[100px] rounded-md" />
    </div>
    <PaymentsTableLoading />
  </main>
);

export default PaymentsPageSkeleton;
