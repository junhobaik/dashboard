import gql from 'graphql-tag';

export const USER_DATA = gql`
  query getUserData {
    user {
      name
    }
  }
`;

export const HEADER_QUERY = gql`
  {
    user {
      name
      picture
    }
  }
`;

export const FEED_DATA = gql`
  {
    user {
      name
      feedList {
        title
        link
        items {
          title
          link
          contentSnippet
          isoDate
        }
      }
    }
  }
`;
