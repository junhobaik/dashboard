import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(_id: ID!): User
    admin: User
  }

  type User {
    _id: ID!
    name: String!
    feedIds: [String]
    feeds: [Feed]
  }
`;
