import gql from 'graphql-tag';

export const USER_DATA = gql`
  query getUserData($userId: String!) {
    user(_id: $userId) {
      name
    }
  }
`;

export const ADMIN = gql`
  {
    users {
      _id
      name
    }
  }
`;
