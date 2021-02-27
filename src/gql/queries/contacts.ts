import { gql } from "@apollo/client";

export const MY_CONTACTS = gql`
  query MyContacts {
    myContacts {
      id
      username
      avatar
    }
    getNotifications {
      sent
      notifications {
        username
        id
        avatar
      }
    }
  }
`;

export const SEARCH_CONTACTS = gql`
  query ContactList($search: String!) {
    contactList(search: $search) {
      id
      avatar
      username
    }
  }
`;
