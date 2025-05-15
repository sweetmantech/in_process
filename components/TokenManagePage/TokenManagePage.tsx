import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "./Airdrop";

const TokenManagePage = () => {
  return (
    <AirdropProvider>
      <Airdrop />
    </AirdropProvider>
  );
};

export default TokenManagePage;
