import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import { userModel, feedModel } from './models';

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    console.log('context user: ', req.user);
    return { userModel, feedModel };
  }
});
