import { gql } from "@apollo/client";

export const QUERY_LOGIN = gql`
  query Login($email: String!, $passwordHash: String!) {
    user: login(email: $email, passwordHash: $passwordHash) {
      id
      fullname
    }
  }
`;
