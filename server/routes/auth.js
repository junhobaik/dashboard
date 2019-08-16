import express from 'express';
import passport from 'passport';
import { userModel } from '../models';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const { user } = req;
    userModel.findOne({ googleId: user.id }, (err, userData) => {
      if (err) console.error(err);
      if (!userData) {
        userModel.create({ googleId: user.id, name: user.displayName });
      }
    });
    res.redirect('http://localhost:3000/');
  }
);

export default router;
