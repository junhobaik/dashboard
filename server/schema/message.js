import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages: [Message!]!
    message(_id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(_id: ID!): Boolean!
  }

  type Message {
    _id: ID!
    text: String!
    user: User!
    userId: ID!
  }
`;
