import TopupPage from "@/components/TopupPage";
import TopupProvider from "@/providers/TopupProvider";

const Topup = () => (
  <TopupProvider>
    <TopupPage />
  </TopupProvider>
);

export default Topup;
