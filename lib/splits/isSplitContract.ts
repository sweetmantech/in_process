import { getPublicClient } from "../viem/publicClient";
import { Address } from "viem";

const isSplitContract = async (address: Address, chainId: number) => {
  const publicClient = getPublicClient(chainId);
  const bytecode = await publicClient.getCode({
    address,
  });
  return (
    bytecode ===
    "0x36602c57343d527f9e4ac34f21c619cefc926c8bd93b54bf5a39c7ab2127a895af1cc0691d7e3dff593da1005b3d3d3d3d363d3d37363d731e2086a7e84a32482ac03000d56925f607ccb7085af43d3d93803e605757fd5bf3"
  );
};

export default isSplitContract;
