export interface Message {
  body: string;
  username: string;
  sub: string;
  timestamp: string;
}

export interface ChatSubscriptionData {
  messages: Message;
}
export interface ChatTree {
  activeSub: string | null;
  chats: Record<string, Message[]>;
}
