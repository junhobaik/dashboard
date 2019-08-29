import express from 'express';
import cookie from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import { userModel, feedModel } from './models';

// import server from './apollo';
import passportInit from './lib/passport';
import session from './lib/session';

import api from './routes/api';
import auth from './routes/auth';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(session);
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);
app.use('/auth', auth);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    const user = req.user || null;
    console.log('context user: ', user, req);
    return { user, req };
  }
});

// const isAuthenticated = (req, res, next) => {
//   console.log(req.isAuthenticated());
//   return req.isAuthenticated() ? next() : res.redirect('http://localhost:3000');
// };

// app.use('/graphql', isAuthenticated );

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
