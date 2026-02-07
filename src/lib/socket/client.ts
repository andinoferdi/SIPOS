import { io, type Socket } from "socket.io-client";
import type {
  SocketClientToServerEvents,
  SocketServerToClientEvents,
} from "@/types/socket-events";

let socketInstance:
  | Socket<SocketServerToClientEvents, SocketClientToServerEvents>
  | undefined;

export const getSocketClient = () => {
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  if (!socketUrl) {
    throw new Error("NEXT_PUBLIC_SOCKET_URL is not set");
  }

  if (socketInstance) {
    return socketInstance;
  }

  socketInstance = io(socketUrl, {
    autoConnect: false,
    transports: ["websocket"],
  });

  return socketInstance;
};
