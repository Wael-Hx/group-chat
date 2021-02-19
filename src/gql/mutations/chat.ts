import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $id: String!
    $username: String!
    $body: String!
    $to: String!
  ) {
    sendMsg(id: $id, username: $username, body: $body, to: $to)
  }
`;
