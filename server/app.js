/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';

require('dotenv').config();

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1]
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
