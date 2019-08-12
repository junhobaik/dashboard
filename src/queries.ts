import gql from 'graphql-tag';

export const USER_DATA = gql`
  query getUserData($userId: Int!) {
    user(id: $userId) {
      name
    }
  }
`;

export const ADMIN = gql`
  {
    users {
      name
    }
  }
`;
