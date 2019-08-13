import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    feeds: [Feed!]!
    feed(_id: String!): Feed!
  }

  extend type Mutation {
    createFeed(title: String!): Feed!
    deleteFeed(_id: String!): Boolean!
  }

  type Feed {
    _id: String!
    title: String!
    users: [User]
    feed: Feed!
    subUsers: [User]
  }
`;
