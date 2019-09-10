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
        readedItem
        items {
          _id
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

export const ADD_FEED = gql`
  mutation addFeed($url: String!, $category: String!) {
    addFeed(url: $url, category: $category) {
      response
    }
  }
`;

export const TOGGLE_HIDE_FEED_ITEMS = gql`
  mutation toggleHideFeedItems($feedId: String!, $isHide: Boolean!) {
    toggleHideFeedItems(feedId: $feedId, isHide: $isHide) {
      response
    }
  }
`;
