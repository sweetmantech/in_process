import { sendMessage } from "@/lib/telegram/sendMessage";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    feedback,
    name,
    wallet,
  }: { feedback: string; name: string; wallet?: Address } = body;

  // Validate required fields
  if (!name?.trim() || !feedback?.trim()) {
    return Response.json(
      { message: "Name and feedback are required" },
      { status: 400 }
    );
  }

  try {
    const message = wallet
      ? `New Feedback\n\nName: ${name}\n\nWallet: ${wallet}\n\nMessage:\n${feedback}`
      : `New Feedback\n\nName: ${name}\n\nMessage:\n${feedback}`;
    await sendMessage(message);
    return Response.json({ success: true });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
