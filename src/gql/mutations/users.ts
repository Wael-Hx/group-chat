import { gql } from "@apollo/client";
import { UserFragment } from "../fragments/UserFragment";

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      credentials: { username: $username, email: $email, password: $password }
    ) {
      ...CurrentUser
    }
  }
  ${UserFragment}
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(credentials: { email: $email, password: $password }) {
      ...CurrentUser
    }
  }
  ${UserFragment}
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword)
  }
`;
