import { smartWalletABI } from "@/lib/abis/smartWalletABI";
import { CHAIN } from "@/lib/consts";
import getSmartWallet from "@/lib/getSmartWallet";
import { NextRequest } from "next/server";
import { Address, createWalletClient, encodeFunctionData, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { parameters } = body;
  const { abi, functionName, address, args } = parameters;
  try {
    const smartWallet = await getSmartWallet();
    if (!smartWallet) throw new Error();
    const admin = privateKeyToAccount(process.env.PRIVATE_KEY as Address);
    const createContractCalldata = encodeFunctionData({
      abi,
      functionName,
      args,
    });
    const walletClient = createWalletClient({
      account: admin,
      transport: http(CHAIN.rpcUrls.default.http[0]),
    });
    const hash = await walletClient.writeContract({
      address: smartWallet.address,
      abi: smartWalletABI,
      functionName: "execute",
      args: [address, 0, createContractCalldata],
      chain: CHAIN,
    });
    return Response.json({ transactionHash: hash });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create collection";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
