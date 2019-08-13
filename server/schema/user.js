import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(_id: String!): User
  }

  type User {
    _id: String!
    name: String!
    feedIds: [String]
    feeds: [Feed]
  }
`;
