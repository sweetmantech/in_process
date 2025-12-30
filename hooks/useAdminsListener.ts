import { useMomentProvider } from "@/providers/MomentProvider";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const useAdminsListener = () => {
  const { momentAdmins } = useMomentProvider();

  const prevAdminsLengthRef = useRef<number>(momentAdmins?.length ?? 0);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    const currentLength = momentAdmins?.length ?? 0;
    const prevLength = prevAdminsLengthRef.current;

    if (currentLength > prevLength && isMounted.current) {
      toast.success("Admin added successfully.");
    }

    if (currentLength < prevLength && isMounted.current && prevLength > 0) {
      toast.success("Admin removed successfully.");
    }

    prevAdminsLengthRef.current = currentLength;
  }, [momentAdmins?.length]);
};

export default useAdminsListener;
