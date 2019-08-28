import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    feeds: [Feed!]!
    feed(_id: String!): Feed!
  }

  type Feed {
    _id: String!
    title: String!
    feedUrl: String!
    pubDate: String
  }
`;
