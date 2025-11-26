export type SetupNewContract = {
  id: string;
  chainId: number;
  address: string;
  contractURI: string;
  defaultAdmin: string;
  transactionHash: string;
  blockNumber: number;
  blockTimestamp: number;
};

export type GraphQLResponse = {
  data: {
    CreatorFactory_SetupNewContract: SetupNewContract[];
  };
};
