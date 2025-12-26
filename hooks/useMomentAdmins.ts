import { useState, useMemo } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { toast } from "sonner";

const useMomentAdmins = () => {
  const { momentAdmins } = useMomentProvider();
  const [newAdminAddress, setNewAdminAddress] = useState("");

  const uniqueAdmins = useMemo(() => {
    if (!momentAdmins) return [];
    return Array.from(new Set(momentAdmins)) as string[];
  }, [momentAdmins]);

  const handleAddAdmin = () => {
    // TODO: Implement add admin logic
    toast.success("we are cooking this feature");
    setNewAdminAddress("");
  };

  const handleRemoveAdmin = (address: string) => {
    // TODO: Implement remove admin logic
    toast.success("we are cooking this feature");
  };

  return {
    admins: uniqueAdmins,
    newAdminAddress,
    setNewAdminAddress,
    handleAddAdmin,
    handleRemoveAdmin,
  };
};

export default useMomentAdmins;
