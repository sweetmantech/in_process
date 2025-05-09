import getNextTokenIds from "@/lib/viem/getNextTokenIds";
import {
  erc20MinterAddresses,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "@/lib/protocolSdk/constants";
import {
  CHAIN_ID,
  CROSSMINT_SIGNER_ADDRESS,
  ETH_USDC_WRAPPER,
} from "@/lib/consts";
import {
  erc20MinterABI,
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { getPublicClient } from "@/lib/viem/publicClient";
import { Collection } from "@/types/token";
import { Address, formatEther, formatUnits } from "viem";

const fetchTokenData = async (contract: Address) => {
  const response = await fetch(`/api/dune/purchased?tokenContract=${contract}`);
  return response.ok ? response.json() : [];
};

const fetchTransferData = async (contract: Address, owner: Address) => {
  const [responseUsdcWrapper, responseCrossmint, responseDirectmint] =
    await Promise.all([
      fetch(
        `/api/dune/purchased/usdc_transfers?tokenContract=${contract}&owner=${owner}&wrapper=${ETH_USDC_WRAPPER}`,
      ),
      fetch(
        `/api/dune/purchased/usdc_transfers?tokenContract=${contract}&owner=${owner}&wrapper=${CROSSMINT_SIGNER_ADDRESS[CHAIN_ID]}`,
      ),
      fetch(
        `/api/dune/purchased/usdc_transfers?tokenContract=${contract}&owner=${owner}&wrapper=${erc20MinterAddresses[CHAIN_ID]}`,
      ),
    ]);

  const dataUsdcWrapper = responseUsdcWrapper.ok
    ? await responseUsdcWrapper.json()
    : [];
  const dataCrossmint = responseCrossmint.ok
    ? await responseCrossmint.json()
    : [];

  const dataDirectmint = responseDirectmint.ok
    ? await responseDirectmint.json()
    : [];
  return [...dataUsdcWrapper, ...dataCrossmint, ...dataDirectmint];
};

const getTotalEarnings = async (
  collections: Collection[],
  artistAddress: Address,
) => {
  const nextTokenIds = await getNextTokenIds(collections);
  const publicClient = getPublicClient(CHAIN_ID);

  const calls = nextTokenIds.flatMap((c) =>
    Array.from({ length: c.nextTokenId - 1 }, (_, i) => [
      {
        address: zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
        abi: zoraCreatorFixedPriceSaleStrategyABI,
        functionName: "sale",
        args: [c.newContract, i + 1],
      },
      {
        address: erc20MinterAddresses[CHAIN_ID],
        abi: erc20MinterABI,
        functionName: "sale",
        args: [c.newContract, i + 1],
      },
      {
        address: c.newContract,
        abi: zoraCreator1155ImplABI,
        functionName: "getTokenInfo",
        args: [i + 1],
      },
    ]).flat(),
  );

  const returnValues: any = await publicClient.multicall({
    contracts: calls as any,
  });
  const ethPriceCollections = new Set<Address>();
  const usdcPriceCollections = new Set<Address>();
  for (let i = 0; i < returnValues.length; i += 3) {
    const totalMinted = returnValues[i + 2].result?.totalMinted;
    const ethTokenPrice = returnValues[i].result?.pricePerToken as bigint;
    const usdcTokenPrice = returnValues[i + 1].result?.pricePerToken as bigint;

    if (totalMinted > BigInt(0)) {
      const collectionAddress = calls[i].args[0] as Address;
      if (ethTokenPrice > BigInt(0)) ethPriceCollections.add(collectionAddress);
      if (usdcTokenPrice > BigInt(0))
        usdcPriceCollections.add(collectionAddress);
    }
  }

  const ethEvents = await Promise.all(
    [...ethPriceCollections].map(fetchTokenData),
  );
  const usdcEvents = await Promise.all(
    [...usdcPriceCollections].map(
      async (c: Address) => await fetchTransferData(c, artistAddress),
    ),
  );
  const ethSum = ethEvents
    .flat()
    .reduce((acc, e) => acc + BigInt(e.value), BigInt(0));
  const usdcSum = usdcEvents
    .flat()
    .reduce((acc, e) => acc + BigInt(e.amount), BigInt(0));

  return {
    eth: formatEther(ethSum),
    usdc: formatUnits(usdcSum, 6),
  };
};

export default getTotalEarnings;
