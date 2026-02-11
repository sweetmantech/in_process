import { io, Socket } from "socket.io-client";
import { IN_PROCESS_CRON_SOCKET_URL } from "@/lib/consts";

let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) {
    socket = io(IN_PROCESS_CRON_SOCKET_URL);
  }
  return socket;
};

export default getSocket;
