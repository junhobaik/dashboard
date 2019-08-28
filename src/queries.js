import gql from 'graphql-tag';

export const USER_DATA = gql`
  query getUserData($googleId: String!) {
    user(googleId: $googleId) {
      name
      feed {
        title
        feedUrl
        link
        items {
          _id
          title
          contentSnippet
          isoDate
          link
        }
      }
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
