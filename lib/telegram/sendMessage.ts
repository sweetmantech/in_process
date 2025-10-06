import TelegramBot from "node-telegram-bot-api";
import telegramClient from "./client";
import { trimMessage } from "./trimMessage";
import { INPROCESS_GROUP_CHAT_ID } from "../consts";

export const sendMessage = async (
  text: string,
  options?: TelegramBot.SendMessageOptions,
): Promise<TelegramBot.Message> => {
  const trimmedText = trimMessage(text);

<<<<<<< HEAD
  return telegramClient.sendMessage(INPROCESS_GROUP_CHAT_ID, trimmedText, options);
=======
  return telegramClient.sendMessage(
    INPROCESS_GROUP_CHAT_ID,
    trimmedText,
    options,
  );
>>>>>>> 8e1db48759342529f34e1b1d337c4a893fcc3c90
};
