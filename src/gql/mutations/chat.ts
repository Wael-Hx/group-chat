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

export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $name: String!
    $cover: String
    $cover_image: String
    $description: String!
  ) {
    createGroup(
      groupDetails: {
        name: $name
        cover: $cover
        cover_image: $cover_image
        description: $description
      }
    ) {
      id
      name
      cover
      cover_image
      comm_admin
    }
  }
`;
