/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import express from 'express';
import fetch from 'node-fetch';
import Parser from 'rss-parser';

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

router.get('/getfeed', (req, res, next) => {
  const { url } = req.query;

  const parser = new Parser();

  const feed = (async () => {
    return await parser.parseURL(url);
  })();

  feed
    .then(() => {
      console.log('Success');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error')
      res.sendStatus(204);
    });

  
});

export default router;
