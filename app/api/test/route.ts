export async function GET() {
  return Response.json(process.env.NEXT_PUBLIC_CROSSMINT_API_KEY as string);
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
