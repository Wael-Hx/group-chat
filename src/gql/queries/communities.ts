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
