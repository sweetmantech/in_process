import { useUserProvider } from "@/providers/UserProvider";
import { useParams } from "next/navigation";

const useArtistEditable = () => {
  const { artistWallet, connectedAddress } = useUserProvider();
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() || "";

  const isEditable =
    (address?.toLowerCase() === artistWallet?.toLowerCase() ||
      address?.toLowerCase() === connectedAddress?.toLowerCase()) &&
    Boolean(address);

  return {
    isEditable,
  };
};

export default useArtistEditable;
