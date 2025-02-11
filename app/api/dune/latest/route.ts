export async function GET() {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-DUNE-API-KEY": process.env.DUNE_API_KEY as string,
      },
    };

    const url = `https://api.dune.com/api/v1/query/4706176/results`;

    const response = await fetch(url, options);

    const data = await response.json();

    return Response.json(data.result.rows);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Latest";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
