import { gql } from "@apollo/client";
import { UserFragment } from "../fragments/UserFragment";

export const ME = gql`
  query Me {
    me {
      ...CurrentUser
    }
  }
  ${UserFragment}
`;

export const USER = gql`
  query User {
    loggedUser @client
  }
`;
