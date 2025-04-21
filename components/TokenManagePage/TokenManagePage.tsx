import { Fragment } from "react";
import Overview from "./Overview";
import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "./Airdrop";

const TokenManagePage = () => {
  return (
    <Fragment>
      <Overview />
      <AirdropProvider>
        <Airdrop />
      </AirdropProvider>
    </Fragment>
  );
};

export default TokenManagePage;
