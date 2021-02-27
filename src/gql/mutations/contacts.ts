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

export const SEND_CONTACT_REQUEST = gql`
  mutation SendContactRequest(
    $userId: ID!
    $username: String!
    $avatar: String
    $contactId: ID!
    $contactName: String!
    $contactAvatar: String
  ) {
    sendContactRequest(
      from: { id: $userId, username: $username, avatar: $avatar }
      contact: {
        id: $contactId
        username: $contactName
        avatar: $contactAvatar
      }
    )
  }
`;
