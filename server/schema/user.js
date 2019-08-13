import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(_id: ID!): User
    me: User
  }

  type User {
    _id: ID!
    username: String!
    messages: [Message!]
  }
`;
