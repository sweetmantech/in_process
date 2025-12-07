export async function GET() {
  return Response.json({
    status: "success",
    env: process.env,
  });
}
