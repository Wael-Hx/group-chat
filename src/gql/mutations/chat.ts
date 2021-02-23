import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($id: ID!, $username: String!, $body: String!, $to: ID!) {
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

export const ADD_MEMBERS = gql`
  mutation AddMembers($groupId: ID!, $users: [ID!]!) {
    addMembers(members: { groupId: $groupId, users: $users })
  }
`;
