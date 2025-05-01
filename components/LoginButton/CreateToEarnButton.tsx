import { useEthPriceProvider } from "@/providers/EthPriceProvider";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const CreateToEarnButton = ({ className = "" }: { className?: string }) => {
  const { push } = useRouter();
  const { toggleNavbar } = useLayoutProvider();
  const { data } = useUserCollectionsProvider();
  const { ethPrice } = useEthPriceProvider();
  const earnings = Number(Number(data?.totalEarnings || 0) * ethPrice).toFixed(
    2,
  );

  if (parseFloat(earnings) > 0 || !data?.totalEarnings) return <Fragment />;
  return (
    <button
      type="button"
      className={`text-white text-xl md:text-base font-spectral-italic ${className}`}
      onClick={() => {
        toggleNavbar();
        push("/create");
      }}
    >
      create to earn
    </button>
  );
};

export default CreateToEarnButton;
