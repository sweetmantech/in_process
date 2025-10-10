import { sendMessage } from "@/lib/telegram/sendMessage";
import { sendPhoto, sendDocument, sendVideo } from "@/lib/telegram/sendMedia";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const feedback = formData.get("feedback") as string;
    const name = formData.get("name") as string;
    const wallet = formData.get("wallet") as Address | null;
    const mediaFile = formData.get("media") as File | null;

    // Validate required fields
    if (!name?.trim() || !feedback?.trim()) {
      return Response.json({ message: "Name and feedback are required" }, { status: 400 });
    }

    const message = wallet
      ? `New Feedback\n\nName: ${name}\n\nWallet: ${wallet}\n\nMessage:\n${feedback}`
      : `New Feedback\n\nName: ${name}\n\nMessage:\n${feedback}`;

    // Handle media upload if present
    if (mediaFile) {
      const buffer = Buffer.from(await mediaFile.arrayBuffer());
      const mimeType = mediaFile.type;
      const filename = mediaFile.name;

      if (mimeType.startsWith("image/")) {
        await sendPhoto(buffer, message);
      } else if (mimeType.startsWith("video/")) {
        await sendVideo(buffer, message);
      } else {
        await sendDocument(buffer, filename, message);
      }
    } else {
      await sendMessage(message);
    }

    return Response.json({ success: true });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to submit feedback";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
