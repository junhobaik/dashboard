import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import schema from './schema';
import resolvers from './resolvers';
import { userModel, feedModel } from './models';
import dummyData from './models/dummyData';

require('dotenv').config();

const app = express();

// mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

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

// passport
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
      callbackURL: 'http://localhost:4000/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        return done(null, profile);
      });
    }
  )
);

// middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// session.
app.use(passport.initialize());
app.use(passport.session());

// 구글 로그인
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// 구글 로그인 후, 콜백
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const { user } = req;
    userModel.findOne({ googleId: user.id }, (err, userData) => {
      if (err) console.error(err);
      if (!userData) {
        userModel.create({ googleId: user.id, name: user.displayName });
      }
    });
    res.redirect('http://localhost:3000');
  }
);

// 현재 user 정보 불러오기
app.get('/api/account', (req, res) => {
  res.json({
    user: req.user || null
  });
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
