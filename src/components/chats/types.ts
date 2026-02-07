export type ChatPresence = "online" | "away" | "offline";

export type ChatSender = "me" | "contact";

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  presence: ChatPresence;
  lastActive: string;
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text?: string;
  image?: string;
  timestamp: string;
}
