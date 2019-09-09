/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import express from 'express';
import Parser from 'rss-parser';

import { feedModel, userModel } from '../models';
import isAuthenticated from './util';

const router = express.Router();
const parser = new Parser();

router.get('/account', isAuthenticated, (req, res, next) => {
  res.json({
    title: 'Account',
    name: req.user.displayName,
    user: req.user
  });
});

const getFeed = async url => {
  return await parser.parseURL(url);
};

router.get('/getfeed', (req, res, next) => {
  const { url } = req.query;

  getFeed(url)
    .then(() => {
      // console.log('Success');
      res.sendStatus(200);
    })
    .catch(err => {
      // console.log('Error');
      res.sendStatus(204);
    });
});

export default router;
