import { Notifications, UserVar } from "../../types/users.types";

export const randomAcountState: UserVar & Notifications = {
  isAuthenticated: true,
  user: {
    type: "anonymous",
    avatar: "",
    email: "",
    username: Math.random().toString(36).substr(2, 5),
    id: Math.random().toString(36).substr(2, 5),
    createdAt: Date.now().toString(),
  },
  loading: false,
  contactList: [],
  sent: [],
  notifications: [],
  count: 0,
};
