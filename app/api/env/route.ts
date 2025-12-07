export async function GET() {
  return Response.json({
    status: "success",
    env: JSON.stringify(process.env),
  });
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
