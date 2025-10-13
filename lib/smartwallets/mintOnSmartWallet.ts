import { Address } from "viem";

interface mintCommentInput {
  token: {
    tokenId: number;
    tokenContractAddress: Address;
  };
  account: Address;
  to: Address;
  comment: string;
  amount: number;
}
const mintOnSmartWallet = async ({ token, account, comment, amount, to }: mintCommentInput) => {
  const response = await fetch(`/api/smartwallet/comment`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      account,
      to,
      token,
      comment,
      amount,
    }),
  });

  const data = await response.json();

  return data.transactionHash;
};

export default mintOnSmartWallet;
