import { usePathname, useRouter } from "next/navigation";
import { useMetadata } from "@/hooks/useMetadata";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { Moment } from "@/types/timeline";

export const useClickMoment = (moment: Moment) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/timeline";

  const { isLoading, data } = useMetadata(moment.uri);

  const handleClick = () => {
    if (isHomePage) {
      push(`/${moment.admins[0].address}`);
      return;
    }
    if (data?.external_url) {
      const newWindow = window.open(data.external_url, "_blank");
      if (newWindow) {
        newWindow.opener = null;
      }
      return;
    }
    const shortNetworkName = getShortNetworkName(
      moment.chain_id === 8453 ? "base" : "base sepolia"
    );
    const tokenId = moment.token_id == "0" ? 1 : moment.token_id;
    push(`/collect/${shortNetworkName}:${moment.address}/${tokenId}`);
    return;
  };

  return {
    isLoading,
    data,
    handleClick,
    formattedDate: new Date(moment.created_at).toLocaleString().toLowerCase(),
  };
};
