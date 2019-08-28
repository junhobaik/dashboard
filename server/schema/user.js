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
  }
`;
