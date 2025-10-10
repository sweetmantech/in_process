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
