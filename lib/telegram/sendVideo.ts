import TelegramBot from "node-telegram-bot-api";
import telegramClient from "./client";
import { INPROCESS_GROUP_CHAT_ID } from "../consts";

export const sendVideo = async (
  video: Buffer,
  caption?: string,
  options?: TelegramBot.SendVideoOptions
): Promise<TelegramBot.Message> => {
  return telegramClient.sendVideo(INPROCESS_GROUP_CHAT_ID, video, {
    caption,
    parse_mode: "HTML",
    ...options,
  });
};
