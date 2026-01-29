import { useUserProvider } from "@/providers/UserProvider";
import { useParams } from "next/navigation";

const useArtistEditable = () => {
  const { artistWallet, socialWalletAddress } = useUserProvider();
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() || "";

  const isEditable =
    (address?.toLowerCase() === artistWallet?.toLowerCase() ||
      address?.toLowerCase() === socialWalletAddress?.toLowerCase()) &&
    Boolean(address);

  return {
    isEditable,
  };
};

export default useArtistEditable;
