import { gql } from "@apollo/client";

export const ADD_CONTACT = gql`
  mutation NewContact($contact: ID!) {
    newContact(contact: $contact) {
      id
      username
      avatar
    }
  }
`;
