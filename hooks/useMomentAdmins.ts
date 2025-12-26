import { useMemo } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { toast } from "sonner";

const useMomentAdmins = () => {
  const { momentAdmins } = useMomentProvider();

  const uniqueAdmins = useMemo(() => {
    if (!momentAdmins) return [];
    return Array.from(new Set(momentAdmins)) as string[];
  }, [momentAdmins]);

  const handleRemoveAdmin = (address: string) => {
    // TODO: Implement remove admin logic
    toast.success("we are cooking this feature");
  };

  return {
    admins: uniqueAdmins,
    handleRemoveAdmin,
  };
};

export default useMomentAdmins;
