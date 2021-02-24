import { InMemoryCache, makeVar } from "@apollo/client";
import { CommunitiesData } from "./types/communities.type";
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
        communityTabsData: {
          read() {
            return communityTabsData();
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
  contactList: [],
});

export const chatMessagesTree = makeVar<ChatTree>({
  tabIndex: 0,
  activeSub: {
    id: null,
    name: null,
    modId: null,
  },
  chats: {},
});

export const communityTabsData = makeVar<CommunitiesData>({
  communityTabs: [
    {
      comm_admin: null,
      id: "0",
      name: "General",
      description: "general chat for all users",
      cover_image: undefined,
    },
  ],
});

export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  username: string;
  avatar?: string;
}

export interface UserVar {
  isAuthenticated: boolean;
  user: User | null;
  loading?: boolean;
  contactList: Contact[];
}

export interface UserData {
  loggedUser: UserVar;
}
