import { INPROCESS_GROUP_CHAT_ID } from "@/lib/consts";
import { NextRequest } from "next/server";
import TelegramBot from "node-telegram-bot-api";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { feedback } = body;
  try {
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN as string);
    bot.sendMessage(INPROCESS_GROUP_CHAT_ID, feedback);
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
