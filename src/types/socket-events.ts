export interface SocketServerToClientEvents {
  connected: (payload: { connectedAt: string }) => void;
}

export interface SocketClientToServerEvents {
  ping: () => void;
}
