import { useUserProvider } from "@/providers/UserProvider";
import { TimelineMoment } from "@/types/moment";

const useIsMomentAdmin = (moment: TimelineMoment) => {
  const { artistWallet } = useUserProvider();
  if (!artistWallet) return false;
  return moment.admins.some((admin) => admin.address.toLowerCase() === artistWallet.toLowerCase());
};

export default useIsMomentAdmin;
