import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import { userModel, feedModel } from './models';
import dummyData from './models/dummyData';

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    modles: dummyData,
    userModel,
    feedModel,
    admin: async () => await userModel.find({ name: 'Jhon' }, (err, user) => user)
  }
});
