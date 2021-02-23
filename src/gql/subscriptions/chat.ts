import { gql } from "@apollo/client";

export const MYSUBS = gql`
  subscription Messages($mySubs: [ID!]!) {
    messages(mySubs: $mySubs) {
      id
      username
      body
      timestamp
      sub
    }
  }
`;
