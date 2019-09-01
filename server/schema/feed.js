import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    feeds: [Feed]
    feed(_id: String!): Feed
    feedsByIds(ids: [String]!): [feedItems]
  }

  type Feed {
    _id: String
    title: String
    link: String
    feedUrl: String
    pubDate: String
    items: [feedItems]
  }

  type feedItems {
    _id: String
    title: String
    contentSnippet: String
    link: String
    isoDate: String
  }
`;
