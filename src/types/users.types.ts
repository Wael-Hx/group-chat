export interface Contact {
  id: string;
  username: string;
  avatar?: string;
}

export interface NotificationsContent extends Contact {
  body?: string;
  timestamp?: number;
}

export type Notifications = {
  sent: string[];
  notifications: NotificationsContent[];
  count: number;
};

export type UserVar = {
  isAuthenticated: boolean;
  user: User | null;
  loading?: boolean;
  contactList: Contact[];
};

export interface UserData {
  loggedUser: UserVar;
}

export interface User {
  type?: "anonymous";
  id: string;
  username: string;
  avatar: string;
  email: string;
  createdAt: string;
}
