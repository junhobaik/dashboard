import gql from 'graphql-tag';

export const USER_DATA = gql`
  query getUserData {
    user {
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
