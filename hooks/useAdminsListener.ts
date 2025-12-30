import { useMomentProvider } from "@/providers/MomentProvider";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const useAdminsListener = () => {
  const { momentAdmins } = useMomentProvider();

  const prevAdminsLengthRef = useRef<number>(momentAdmins?.length ?? 0);

  useEffect(() => {
    const currentLength = momentAdmins?.length ?? 0;
    const prevLength = prevAdminsLengthRef.current;

    if (currentLength > prevLength && prevLength !== 0) {
      toast.success("Admin added successfully.");
    }

    if (currentLength < prevLength && prevLength > 1) {
      toast.success("Admin removed successfully.");
    }

    prevAdminsLengthRef.current = currentLength;
  }, [momentAdmins?.length]);
};

export default useAdminsListener;
