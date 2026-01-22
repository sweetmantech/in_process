import FundsPage from "@/components/FundsPage";
import SocialWalletBalanceProvider from "@/providers/SocialWalletBalanceProvider";

const Funds = () => (
  <SocialWalletBalanceProvider>
    <FundsPage />
  </SocialWalletBalanceProvider>
);

export default Funds;
