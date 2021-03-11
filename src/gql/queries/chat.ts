import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages($subs: [ID!]!) {
    getMessages(subs: $subs) {
      sub
      id
      username
      body
      timestamp
    }
  }
`;
