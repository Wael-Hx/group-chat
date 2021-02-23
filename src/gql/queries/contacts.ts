import { gql } from "@apollo/client";

export const MY_CONTACTS = gql`
  query MyContacts {
    myContacts {
      id
      username
      avatar
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
