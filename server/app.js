/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

const app = express();

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Mongoose ready');
  })
  .catch(err => {
    console.log('Mongoose connect error', err);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
