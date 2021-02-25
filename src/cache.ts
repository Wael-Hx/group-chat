import { InMemoryCache, makeVar } from "@apollo/client";
import { CommunitiesData } from "./types/communities.type";
import { ChatTree } from "./types/messages.type";
import { UserVar } from "./types/users.types";

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
        chatMessagesTree: {
          read() {
            return chatMessagesTree();
          },
        },
      },
    },
  },
});

export const initialUserState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  contactList: [],
};
export const initialChatState = {
  tabIndex: 0,
  activeSub: {
    id: null,
    name: null,
    modId: null,
  },
  chats: {},
};
export const initialCommunitiesState = {
  communityTabs: [
    {
      comm_admin: null,
      id: "0",
      name: "General",
      description: "general chat for all users",
      cover_image: undefined,
    },
  ],
};
export const loggedUserVar = makeVar<UserVar>(initialUserState);
export const chatMessagesTree = makeVar<ChatTree>(initialChatState);
export const communityTabsData = makeVar<CommunitiesData>(
  initialCommunitiesState
);
