import { gql } from 'apollo-server-express';

export default gql`
  type Foo {
    foo: Int!
  }

  type Query {
    foo: Foo!
  }
`;
