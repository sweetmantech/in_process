import { NextRequest } from "next/server";
import { selectNotifications } from "@/lib/supabase/in_process_notifications/selectNotifications";
import { updateNotifications } from "@/lib/supabase/in_process_notifications/updateNotifications";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const limit = Math.min(Number(searchParams.get("limit")) || 20, 100);
  const page = Number(searchParams.get("page")) || 1;
  const artist = searchParams.get("artist")?.toLowerCase() || undefined;
  const viewedParam = searchParams.get("viewed");
  const viewed = viewedParam ? viewedParam === "true" : undefined;

  try {
    const { data, error } = await selectNotifications({
      limit,
      page,
      artist,
      viewed,
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
      notifications: data || [],
    });
  } catch (error) {
    console.error("Error selecting notifications:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const artist = searchParams.get("artist")?.toLowerCase() || undefined;

  try {
    const { data, error } = await updateNotifications({
      artist,
      viewed: true,
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
      updated: data?.length || 0,
      message: `Marked ${data?.length || 0} notifications as viewed`,
    });
  } catch (error) {
    console.error("Error updating notifications:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
