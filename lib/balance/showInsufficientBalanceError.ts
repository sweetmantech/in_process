import { toast } from "sonner";

export const showInsufficientBalanceError = (currency: "eth" | "usdc"): never => {
  toast.error(`Insufficient ${currency} balance. Please add funds to collect.`, {
    action: {
      label: "Topup",
      onClick: () => {
        window.open("https://inprocess.fun/topup", "_blank");
      },
    },
  });
  throw new Error(`Insufficient ${currency} balance. Please add funds to collect.`);
};
