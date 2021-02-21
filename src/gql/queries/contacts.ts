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
