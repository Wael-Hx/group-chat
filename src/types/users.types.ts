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

export interface User {
  type?: "anonymous";
  id: string;
  username: string;
  avatar: string;
  email: string;
  createdAt: string;
}
