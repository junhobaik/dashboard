import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user: User
  }

  type User {
    _id: String
    googleId: String
    name: String
    feedList: [feedListItem]
  }

  type feedListItem {
    _id: String
    feedId: String
    title: String
    category: String
    readedItem: [String]
    items: [feedItems]
  }
`;
