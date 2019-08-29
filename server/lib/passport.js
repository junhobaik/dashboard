/* eslint-disable no-unused-vars */
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userModel } from '../models';

module.exports = passport => {
  // passport
  passport.serializeUser((user, done) => {
    console.log('> serializeUser', user.displayName);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log('> deserializeUser:', user.displayName);
    done(null, user);
    // userModel.findOne({ googleId: user.id }, (err, userData) => {
    //   if (userData) {
    //     done(null, userData);
    //   } else {
    //     userModel
    //       .create({ googleId: user.id, name: user.displayName })
    //       .then((createdUser, error) => {
    //         done(null, createdUser);
    //       });
    //   }
    // });
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
};
