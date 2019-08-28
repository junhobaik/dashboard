import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(googleId: String!): User
  }

  type User {
    _id: String!
    googleId: String!
    name: String!
    feedList: [feedList]
    feed: [Feed]
  }

  type feedList {
    _id: String!
    feedId: String!
    title: String!
    category: String!
    readedItem: [readedItem]
  }

  type readedItem {
    _id: String
  }
`;
