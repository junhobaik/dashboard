/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import express from 'express';

const router = express.Router();

router.get(
  '/account',

  (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('인증 성공');
      return next();
    }
    console.log('인증 실패');
    res.sendStatus(401);
  },

  (req, res, next) => {
    // console.log(req.user);
    res.json({
      title: 'Account',
      name: req.user.displayName,
      user: req.user
    });
  }
);

export default router;
