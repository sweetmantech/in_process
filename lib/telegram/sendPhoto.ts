import TelegramBot from "node-telegram-bot-api";
import telegramClient from "./client";
import { INPROCESS_GROUP_CHAT_ID } from "../consts";

export const sendPhoto = async (
  photo: Buffer,
  caption?: string,
  options?: TelegramBot.SendPhotoOptions
): Promise<TelegramBot.Message> => {
  return telegramClient.sendPhoto(INPROCESS_GROUP_CHAT_ID, photo, {
    caption,
    parse_mode: "HTML",
    ...options,
  });
};
