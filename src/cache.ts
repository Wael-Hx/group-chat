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
});

export const chatMessagesTree = makeVar<ChatTree>({
  tabIndex: 0,
  activeSub: {
    name: null,
    modId: null,
  },
  chats: {},
});

export const communityTabsData = makeVar<CommunitiesData>({
  communityTabs: [
    {
      comm_admin: null,
      id: 0,
      name: "General",
      description: "general chat for all users",
      cover_image:
        "https://via.placeholder.com/700x400/202636/fff?text=General%20Section",
    },
  ],
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
