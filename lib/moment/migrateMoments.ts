import { Address, getAddress, Hash } from "viem";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { sendUserOperation } from "../coinbase/sendUserOperation";
import getAddPermissionCall from "../viem/getAddPermissionCall";

const migrateMoments = async ({
  collections,
  socialWallet,
  artistWallet,
  chainId,
}: {
  collections: Array<{
    address: string;
    admins: Array<{ artist_address: string; token_id: number }>;
  }>;
  socialWallet: Address;
  artistWallet: {
    address: Address;
    smartWalletAddress: Address;
  };
  chainId: number;
}) => {
  const network = chainId === 84532 ? "base-sepolia" : "base";
  const smartAccount = await getOrCreateSmartWallet({
    address: socialWallet,
  });

  const calls: Array<{ to: Address; data: `0x${string}` }> = [];

  const filtered = collections.filter((collection) =>
    collection.admins.some(
      (admin) => admin.artist_address.toLowerCase() === smartAccount.address.toLowerCase()
    )
  );

  if (!filtered.length) return null;

  console.log(
    "ziad here",
    filtered.map((c) => c.address)
  );
  for (const collection of filtered) {
    const collectionAddress = getAddress(collection.address);
    const addPermissionCall = getAddPermissionCall(collectionAddress, "0", artistWallet.address);
    const addSmartAccountPermissionCall = getAddPermissionCall(
      collectionAddress,
      "0",
      artistWallet.smartWalletAddress
    );
    calls.push(addPermissionCall, addSmartAccountPermissionCall);
  }

  const transaction = await sendUserOperation({
    smartAccount,
    network,
    calls,
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId,
  };
};

export default migrateMoments;
