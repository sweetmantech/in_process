import { Address } from "viem";

const indexMomentClient = async ({
  address,
  tokenId,
  chainId,
}: {
  address: Address;
  tokenId: number;
  chainId: number;
}) => {
  await fetch("/api/moment/index", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      address,
      tokenId,
      chainId,
    }),
  });
};

export default indexMomentClient;
