import TelegramBot from "node-telegram-bot-api";
import telegramClient from "./client";
import { INPROCESS_GROUP_CHAT_ID } from "../consts";

export const sendDocument = async (
  document: Buffer,
  filename: string,
  caption?: string,
  options?: TelegramBot.SendDocumentOptions
): Promise<TelegramBot.Message> => {
  const fileOptions = {
    filename,
    contentType: "application/octet-stream",
    ...options,
  };

  return telegramClient.sendDocument(INPROCESS_GROUP_CHAT_ID, document, {
    caption,
    parse_mode: "HTML",
    ...fileOptions,
  });
};
