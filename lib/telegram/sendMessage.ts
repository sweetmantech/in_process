import TelegramBot from "node-telegram-bot-api";
import telegramClient from "./client";
import { trimMessage } from "./trimMessage";
import { INPROCESS_GROUP_CHAT_ID } from "../consts";

export const sendMessage = async (
  text: string,
  options?: TelegramBot.SendMessageOptions,
): Promise<TelegramBot.Message> => {
  const trimmedText = trimMessage(text);

  return telegramClient.sendMessage(
    INPROCESS_GROUP_CHAT_ID,
    trimmedText,
    options,
  );
};
