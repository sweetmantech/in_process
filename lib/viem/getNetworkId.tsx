import { base, zora } from "viem/chains";

const getNetworkId = (network: string) => {
  switch (network) {
    case "base":
      return base.id;
    case "zora":
      return zora.id;
    default:
      return base.id;
  }
};

export default getNetworkId;
