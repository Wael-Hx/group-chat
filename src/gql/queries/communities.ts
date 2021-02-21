import { gql } from "@apollo/client";

export const GET_MY_COMMUNITIES = gql`
  query CommunitiesData {
    getMyCommunities {
      id
      name
      cover
      cover_image
      comm_admin
    }
  }
`;

export const GET_MEMBERS = gql`
  query Members($groupId: ID!) {
    membersList(groupId: $groupId) {
      id
      username
      avatar
    }
  }
`;
