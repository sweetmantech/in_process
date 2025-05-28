import { useEthPriceProvider } from "@/providers/EthPriceProvider";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const CreateToEarnButton = ({ className = "" }: { className?: string }) => {
  const { push } = useRouter();
  const { toggleNavbar } = useLayoutProvider();
  const { totalEarnings } = useUserCollectionsProvider();
  const { ethPrice } = useEthPriceProvider();
  const ethEarnings = Number(
    Number(totalEarnings?.eth || 0) * ethPrice,
  ).toFixed(2);
  const usdcEarnings = Number(totalEarnings?.usdc).toFixed(2);
  const totalAmount = parseFloat(ethEarnings) + parseFloat(usdcEarnings);

  if (totalAmount > 0 || !totalEarnings) return <Fragment />;
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
