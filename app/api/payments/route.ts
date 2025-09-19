import { NextRequest } from "next/server";
import { selectPayments } from "@/lib/supabase/in_process_payments/selectPayments";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Parse query parameters
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 100);
  const page = Number(searchParams.get("page")) || 1;
  const artist = searchParams.get("artist") || undefined;
  const collector = searchParams.get("collector") || undefined;

  try {
    const { data, error } = await selectPayments({
      limit,
      page,
      artist,
      collector,
    });

    if (error) {
      return Response.json(
        {
          status: "error",
          message: error.message,
        },
        { status: 500 }
      );
    }

    return Response.json({
      status: "success",
      payments: data || [],
    });
  } catch (error) {
    console.error("Error selecting payments:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
