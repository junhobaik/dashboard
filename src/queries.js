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
        feedId
        title
        link
        category
        items {
          title
          link
          contentSnippet
          isoDate
        }
        isHideItems
      }
    }
  }
`;
