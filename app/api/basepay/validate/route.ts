export async function POST(request: Request) {
  const requestData = await request.json();
  console.log("New Base Pay Request", requestData);
  try {
    return Response.json(requestData);
  } catch (error) {
    console.error("Error validating data:", error);
    return Response.json({
      errors: { server: "Server error validating data" },
    });
  }
}
