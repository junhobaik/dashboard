/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import express from 'express';
import fetch from 'node-fetch';
import Parser from 'rss-parser';

const router = express.Router();
const parser = new Parser();

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

const getFeed = async url => {
  return await parser.parseURL(url);
};

router.get('/getfeed', (req, res, next) => {
  const { url } = req.query;

  getFeed(url)
    .then(() => {
      console.log('Success');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error');
      res.sendStatus(204);
    });
});

router.post('/addfeed', (req, res) => {
  const { feedUrl, category } = req.body;
  console.log(feedUrl, category);

  getFeed(feedUrl).then(feed => {
    console.log(feed);
  });

  res.sendStatus(200);
});

export default router;
