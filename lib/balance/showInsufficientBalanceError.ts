import { toast } from "sonner";
import { SITE_ORIGINAL_URL } from "../consts";
import { Currency } from "@/types/balances";

export const showInsufficientBalanceError = (currency: Currency): never => {
  toast.error(`Insufficient ${currency} balance. Please add funds to collect.`, {
    action: {
      label: "Topup",
      onClick: () => {
        window.open(`${SITE_ORIGINAL_URL}/topup`, "_blank");
      },
    },
  });
  throw new Error(`Insufficient ${currency} balance. Please add funds to collect.`);
};
