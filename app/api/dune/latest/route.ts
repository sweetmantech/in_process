import { CHAIN_ID, SETUP_NEW_CONTRACT_EVENT_SIGNATURE } from "@/lib/consts";
import { FACTORY_ADDRESSES } from "@/lib/protocolSdk/create/factory-addresses";

export async function GET() {
  try {
    const options = {
      method: "GET",
      headers: { "X-Dune-Api-Key": process.env.DUNE_API_KEY as string },
    };
    const params = new URLSearchParams({
      decode: "true",
      chain_ids: `${CHAIN_ID}`,
      topic0: SETUP_NEW_CONTRACT_EVENT_SIGNATURE,
    });
    const response = await fetch(
      `https://api.dune.com/api/echo/v1/transactions/evm/${FACTORY_ADDRESSES[CHAIN_ID]}?${params}`,
      options,
    );
    if (!response.ok) {
      return Response.json({ message: "failed echo API" }, { status: 500 });
    }

    const { transactions } = await response.json();
    const formattedFeed = transactions.map((transaction: any) => {
      const setUpEvent = transaction.logs.find(
        (log: any) => log.decoded.name === "SetupNewContract",
      );
      const data: any = {};
      setUpEvent.decoded.inputs.map((ele: any) => {
        data[`${ele.name}`] = ele.value;
      });
      data.released_at = new Date(transaction.block_time).getTime();
      return data;
    });
    return Response.json(formattedFeed);
  } catch (e: any) {
    console.log(e);
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
