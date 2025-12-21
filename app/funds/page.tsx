import FundsPage from "@/components/FundsPage";
import TopupProvider from "@/providers/TopupProvider";

const Funds = () => (
  <TopupProvider>
    <FundsPage />
  </TopupProvider>
);

export default Funds;
