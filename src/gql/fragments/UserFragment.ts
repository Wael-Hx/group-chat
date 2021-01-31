import { gql } from "@apollo/client";

export const UserFragment = gql`
  fragment CurrentUser on User {
    id
    username
    avatar
    email
    created_at
  }
`;
