import { useState, useMemo } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";

const useMomentAdmins = () => {
  const { momentAdmins } = useMomentProvider();
  const [newAdminAddress, setNewAdminAddress] = useState("");

  const uniqueAdmins = useMemo(() => {
    if (!momentAdmins) return [];
    return Array.from(new Set(momentAdmins)) as string[];
  }, [momentAdmins]);

  const handleAddAdmin = () => {
    // TODO: Implement add admin logic
    console.log("Add admin:", newAdminAddress);
    setNewAdminAddress("");
  };

  const handleRemoveAdmin = (address: string) => {
    // TODO: Implement remove admin logic
    console.log("Remove admin:", address);
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
