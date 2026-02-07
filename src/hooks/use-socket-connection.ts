"use client";

import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import { getSocketClient } from "@/lib/socket/client";
import type {
  SocketClientToServerEvents,
  SocketServerToClientEvents,
} from "@/types/socket-events";

interface UseSocketConnectionResult {
  isConnected: boolean;
  error: string | null;
}

export const useSocketConnection = (): UseSocketConnectionResult => {
  const [socket, setSocket] = useState<
    Socket<SocketServerToClientEvents, SocketClientToServerEvents> | null
  >(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setSocket(getSocketClient());
      setError(null);
    } catch (socketError) {
      if (socketError instanceof Error) {
        setError(socketError.message);
      } else {
        setError("Unable to initialize socket");
      }
    }
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleConnect = () => {
      setIsConnected(true);
      setError(null);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleConnectError = (connectError: Error) => {
      setError(connectError.message);
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.disconnect();
    };
  }, [socket]);

  return { isConnected, error };
};
