import { Address, Hex, PublicClient } from "viem";
import {
  contracts1155,
  zoraCreator1155FactoryImplABI,
  zoraCreator1155ImplABI,
} from "@zoralabs/protocol-deployments";
import { NewContractParams } from "./types";
import { getFactoryAddress } from "./factory-addresses";

type contracts1155Address = keyof typeof contracts1155.addresses;
export function new1155ContractVersion(chainId: number): string {
  // todo: get from subgraph
  const address = contracts1155.addresses[chainId as contracts1155Address];
  if (!address) {
    throw new Error(`No contract address for chainId ${chainId}`);
  }

  return address.CONTRACT_1155_IMPL_VERSION;
}

export async function getDeterministicContractAddress({
  publicClient,
  account,
  setupActions,
  contract,
  chainId,
}: {
  account: Address;
  publicClient: Pick<PublicClient, "readContract">;
  setupActions: Hex[];
  contract: NewContractParams;
  chainId: number;
  // Account that is the creator of the contract
}): Promise<Address> {
  const contractAddress = await publicClient.readContract({
    abi: zoraCreator1155FactoryImplABI,
    address: getFactoryAddress(chainId),
    functionName: "deterministicContractAddressWithSetupActions",
    args: [account, contract.uri, contract.name, contract.defaultAdmin || account, setupActions],
  });

  return contractAddress;
}

export async function getNewContractMintFee({
  publicClient,
  chainId,
}: {
  publicClient: Pick<PublicClient, "readContract">;
  chainId: number;
}) {
  const implAddress = contracts1155.addresses[chainId as contracts1155Address]
    .CONTRACT_1155_IMPL as Address;

  return await publicClient.readContract({
    abi: zoraCreator1155ImplABI,
    address: implAddress,
    functionName: "mintFee",
  });
}
