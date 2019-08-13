import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    feeds: [Feed!]!
    feed(_id: ID!): Feed!
  }

  extend type Mutation {
    createFeed(title: String!): Feed!
    deleteFeed(_id: ID!): Boolean!
  }

  type Feed {
    _id: ID!
    title: String!
    users: [User]
    feed: Feed!
    subUsers: [User]
  }
`;
