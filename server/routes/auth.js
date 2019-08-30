/* eslint-disable no-unused-vars */
import express from 'express';
import passport from 'passport';

import { userModel } from '../models';

const router = express.Router();

const clientPath = 'http://localhost:3000';

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] }),
  (req, res) => {}
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: clientPath }),
  (req, res) => {
    // console.log('login으로 이동');
    res.redirect(`${clientPath}`);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(clientPath);
});

export default router;