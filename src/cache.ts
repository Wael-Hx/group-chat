import { InMemoryCache, makeVar } from "@apollo/client";
import { ChatTree } from "./types/messages.type";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        loggedUser: {
          read() {
            return loggedUserVar();
          },
        },
      },
    },
  },
});

export const loggedUserVar = makeVar<UserVar>({
  isAuthenticated: false,
  user: null,
  loading: true,
});

export const chatMessagesTree = makeVar<ChatTree>({
  activeSub: null,
  chats: {},
});

interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  createdAt: string;
}

export interface UserVar {
  isAuthenticated: boolean;
  user: User | null;
  loading?: boolean;
}

export interface UserData {
  loggedUser: UserVar;
}
