export async function GET() {
  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=usd,ethereum`,
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": "b9586936-6f69-4f86-abe8-fa33f34e67f1",
          Accept: "application/json",
        },
      },
    );
    const data = await response.json();
    return Response.json(data.data["1027"].quote.USD.price);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get eth price";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
