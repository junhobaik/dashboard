/* eslint-disable no-unused-vars */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { userModel } from '../models';

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
    (accessToken, refreshToken, profile, cb) => {
      process.nextTick(() => {
        return cb(null, profile);
      });
    }
  )
);

module.exports = app => {
  app.use(cookieParser());
  app.use(
    session({
      secret: 'dashboardTempSecret',
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 31 }, // 31일
      // store: new MongoStore({ mongooseConnection: mongoose.connection }),
      resave: false,
      saveUninitialized: true
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] }),
    (req, res) => {}
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    (req, res) => {
      // console.log('login으로 이동');
      res.redirect('http://localhost:3000/login');
    }
  );

  app.post('/auth/signup', (req, res) => {
    const { name } = req.body;
    let result;

    (async () => {
      if (req.isAuthenticated()) {
        const { user } = req;

        userModel.findOne({ googleId: user.id }, (err, userData) => {
          if (err) console.error(err);
          if (!userData) {
            userModel.create({ googleId: user.id, name: req.body.name }).then((created, error) => {
              if (created.name === name) {
                res.sendStatus(201);
              } else {
                res.sendStatus(202);
              }
            });
          }
        });
      } else {
        // console.log('인증 재필요');
      }
    })();

    // res.redirect('http://localhost:3000/');
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
  });
};
