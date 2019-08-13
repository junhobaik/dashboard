import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';

import schema from './schema';
import resolvers from './resolvers';
import { userModel, feedModel } from './models';
import dummyData from './models/dummyData';

require('dotenv').config();

const app = express();
app.use(cors());

const DB_NAME = 'dashboard';
const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0-tsis4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('💡 Connected to MongoDB Server');
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    modles: dummyData,
    userModel,
    feedModel,
    admin: async () => await userModel.find({ name: 'Jhon' }, (err, user) => user)
  }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
