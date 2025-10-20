import {
  zoraCreator1155FactoryImplABI,
  zoraCreator1155ImplABI,
} from "@zoralabs/protocol-deployments";
import type { Account, Address, Hex, PublicClient, TransactionReceipt } from "viem";
import { decodeEventLog } from "viem";
import { makeContractParameters } from "../utils";
import {
  getDeterministicContractAddress,
  getNewContractMintFee,
  new1155ContractVersion,
} from "./contract-setup";
import {
  CreateNew1155ContractAndTokenReturn,
  CreateNew1155ContractParams,
  CreateNew1155ParamsBase,
  CreateNew1155TokenParams,
  CreateNew1155TokenReturn,
  NewContractParams,
} from "./types";
import { constructCreate1155TokenCalls } from "./token-setup";
import { makeOnchainPrepareMintFromCreate } from "./mint-from-create";
import { IContractGetter } from "./contract-getter";
import { getFactoryAddress } from "./factory-addresses";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";

// Default royalty bps
const ROYALTY_BPS_DEFAULT = 1000;

export const getTokenIdFromCreateReceipt = (receipt: TransactionReceipt): bigint => {
  for (const data of receipt.logs) {
    try {
      const decodedLog = decodeEventLog({
        abi: zoraCreator1155ImplABI,
        eventName: "SetupNewToken",
        ...data,
      });
      if (decodedLog && decodedLog.eventName === "SetupNewToken") {
        return decodedLog.args.tokenId;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {}
  }

  throw new Error("No event found in receipt that could be used to get tokenId");
};

export const getContractAddressFromReceipt = (receipt: TransactionReceipt): Address => {
  for (const data of receipt.logs) {
    try {
      const decodedLog = decodeEventLog({
        abi: zoraCreator1155FactoryImplABI,
        eventName: "SetupNewContract",
        ...data,
      });
      if (decodedLog && decodedLog.eventName === "SetupNewContract") {
        return decodedLog.args.newContract;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {}
  }

  throw new Error("No event found in receipt that could be used to get contract address");
};

type MakeContractParametersBase = {
  account: Address | Account;

  tokenSetupActions: Hex[];
};

export function makeCreateContractAndTokenCall({
  account,
  contract,
  royaltyBPS,
  fundsRecipient,
  tokenSetupActions,
  chainId,
}: {
  chainId: number;
  contract: NewContractParams;
  royaltyBPS?: number;
  fundsRecipient?: Address;
} & MakeContractParametersBase) {
  const accountAddress = typeof account === "string" ? account : account.address;
  return makeContractParameters({
    abi: zoraCreator1155FactoryImplABI,
    functionName: "createContractDeterministic",
    account,
    address: getFactoryAddress(chainId),
    args: [
      contract.uri,
      contract.name,
      {
        // deprecated
        royaltyMintSchedule: 0,
        royaltyBPS: royaltyBPS || ROYALTY_BPS_DEFAULT,
        royaltyRecipient: fundsRecipient || accountAddress,
      },
      contract.defaultAdmin || accountAddress,
      tokenSetupActions,
    ],
  });
}

function makeCreateTokenCall({
  contractAddress,
  account,
  tokenSetupActions,
}: {
  contractAddress: Address;
} & MakeContractParametersBase) {
  return makeContractParameters({
    abi: zoraCreator1155ImplABI,
    functionName: "multicall",
    account,
    address: contractAddress,
    args: [tokenSetupActions],
  });
}

export class Create1155Client {
  private readonly chainId: number;
  private readonly publicClient: Pick<PublicClient, "readContract">;
  public readonly contractGetter: IContractGetter;

  constructor({
    chainId,
    publicClient,
    contractGetter,
  }: {
    chainId: number;
    publicClient: Pick<PublicClient, "readContract">;
    contractGetter: IContractGetter;
  }) {
    this.chainId = chainId;
    this.publicClient = publicClient;
    this.contractGetter = contractGetter;
  }

  async createNew1155(
    props: CreateNew1155ContractParams
  ): Promise<CreateNew1155ContractAndTokenReturn> {
    return createNew1155ContractAndToken({
      ...props,
      publicClient: this.publicClient,
      chainId: this.chainId,
    });
  }

  async createNew1155OnExistingContract({
    contractAddress: contract,
    account,
    token,
    getAdditionalSetupActions,
  }: CreateNew1155TokenParams): Promise<CreateNew1155TokenReturn> {
    return createNew1155Token({
      contractAddress: contract,
      account,
      token,
      getAdditionalSetupActions,
      publicClient: this.publicClient,
      chainId: this.chainId,
    });
  }
}

async function createNew1155ContractAndToken({
  contract,
  account,
  chainId,
  token,
  publicClient,
  getAdditionalSetupActions,
}: CreateNew1155ContractParams & {
  publicClient: Pick<PublicClient, "readContract">;
  chainId: number;
}): Promise<CreateNew1155ContractAndTokenReturn> {
  const nextTokenId = BigInt(1);
  const contractVersion = new1155ContractVersion(chainId);

  const {
    minter,
    newToken,
    setupActions: tokenSetupActions,
  } = prepareSetupActions({
    chainId,
    account,
    contractVersion,
    nextTokenId,
    token,
    getAdditionalSetupActions,
    contractName: contract.name,
  });

  const request = makeCreateContractAndTokenCall({
    contract,
    account,
    chainId,
    tokenSetupActions,
    fundsRecipient: token.payoutRecipient,
    royaltyBPS: token.royaltyBPS,
  });

  const contractAddress = await getDeterministicContractAddress({
    account: typeof account === "string" ? account : account.address,
    publicClient,
    setupActions: tokenSetupActions,
    chainId,
    contract,
  });

  const prepareMint = makeOnchainPrepareMintFromCreate({
    contractAddress: contractAddress,
    contractVersion,
    minter,
    result: newToken.salesConfig,
    tokenId: nextTokenId,
    // to get the contract wide mint fee, we get what it would be for a new contract
    getContractMintFee: async () =>
      getNewContractMintFee({
        publicClient,
        chainId,
      }),
    chainId,
  });

  return {
    parameters: request,
    tokenSetupActions,
    newTokenId: nextTokenId,
    newToken,
    contractAddress: contractAddress,
    contractVersion,
    minter,
    prepareMint,
  };
}

async function createNew1155Token({
  contractAddress: contractAddress,
  account,
  getAdditionalSetupActions,
  token,
  chainId,
}: CreateNew1155TokenParams & {
  publicClient: Pick<PublicClient, "readContract">;
  chainId: number;
}): Promise<CreateNew1155TokenReturn> {
  const publicClient = getPublicClient(CHAIN_ID);
  const calls = ["nextTokenId", "contractVersion", "mintFee", "name"].map((fname: string) => ({
    address: contractAddress,
    abi: zoraCreator1155ImplABI,
    functionName: fname,
  }));
  const returnValues = await publicClient.multicall({
    contracts: calls as any,
  });
  const [nextTokenIdValue, contractVersionValue, mintFeeValue, nameValue] = returnValues as any;
  const nextTokenId = nextTokenIdValue.result;
  const contractVersion = contractVersionValue.result;
  const mintFee = mintFeeValue.result;
  const name = nameValue.result;

  const {
    minter,
    newToken,
    setupActions: tokenSetupActions,
  } = prepareSetupActions({
    chainId,
    account,
    contractVersion,
    nextTokenId,
    token,
    getAdditionalSetupActions,
    contractName: name,
  });

  const request = makeCreateTokenCall({
    contractAddress,
    account,
    tokenSetupActions,
  });

  const prepareMint = makeOnchainPrepareMintFromCreate({
    contractAddress: contractAddress,
    contractVersion,
    minter,
    result: newToken.salesConfig,
    tokenId: nextTokenId,
    getContractMintFee: async () => mintFee,
    chainId,
  });

  return {
    parameters: request,
    tokenSetupActions,
    newTokenId: nextTokenId,
    newToken,
    contractVersion,
    minter,
    prepareMint,
  };
}

function prepareSetupActions({
  chainId,
  account,
  contractVersion,
  nextTokenId,
  token,
  contractName,
  getAdditionalSetupActions,
}: {
  chainId: number;
  contractVersion: string;
  nextTokenId: bigint;
  contractName: string;
} & CreateNew1155ParamsBase) {
  const {
    minter,
    newToken,
    setupActions: tokenSetupActions,
  } = constructCreate1155TokenCalls({
    chainId: chainId,
    ownerAddress: typeof account === "string" ? account : account.address,
    contractVersion,
    nextTokenId,
    ...token,
    contractName,
  });

  const setupActions = getAdditionalSetupActions
    ? [...getAdditionalSetupActions, ...tokenSetupActions]
    : tokenSetupActions;

  return { minter, newToken, setupActions };
}
