import truncateAddress from "@/lib/truncateAddress";
import { Address } from "viem";

interface OgFooterProps {
  address: Address;
}
const OgFooter = ({ address }: OgFooterProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <p
        style={{
          fontSize: 24,
        }}
      >
        {truncateAddress(address)}
      </p>
      <p
        style={{
          fontSize: 20,
        }}
      >
        inprocess.myco.wtf
      </p>
    </div>
  );
};

export default OgFooter;
