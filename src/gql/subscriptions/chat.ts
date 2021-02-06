import { gql } from "@apollo/client";

export const MYSUBS = gql`
  subscription Messages($mySubs: [String!]!) {
    messages(mySubs: $mySubs) {
      username
      body
      timestamp
      sub
    }
  }
`;
