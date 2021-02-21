export interface Message {
  body: string;
  username: string;
  id: string;
  sub: string;
  timestamp: number;
}

export interface ChatSubscriptionData {
  messages: Message;
}
export interface ChatTree {
  tabIndex: number;
  activeSub: {
    id: number | null;
    name: string | null;
    modId: string | null;
  };
  chats: Record<string, Message[]>;
}
