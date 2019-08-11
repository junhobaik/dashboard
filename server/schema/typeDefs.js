import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    users: [User]!
    user(id: Int!): User!
  }

  type User {
    _id: Int!
    name: String!
    feeds: [Feed]
  }
  
  type Feed {
    _id: Int!
    title: String!
    link: String!
    feedLink: String!
  }
`;
